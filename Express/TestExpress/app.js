const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const protocol = 'http';
const host = '127.0.0.1';
const port = 8008;
const app = express();
const server = http.createServer(app).listen(
    port,
    host,
    () => {
        console.log(`服务启动, 访问 ${protocol}://${host}:${port}`);
    }
)

let logStream = fs.createWriteStream(
    path.join(process.cwd(), '/log/app.msg.log'),
    {
        flags: 'a'
    }
)

// 打印日志
app.use(morgan('combined', {stream: logStream}));
// 解决跨域
app.use(cors({
    "origin": true, // true 设置为 req.origin.url
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // 容许跨域请求的方式
    "allowedHeaders": "x-requested-with,Authorization,token,content-type", // 跨域请求头
    "preflightContinue": false, // 是否通过 next() 传递 options 请求 给后续中间件
    "maxAge": 1728000, // options 预验结果缓存时间 20 天
    "credentials": true, // 携带 cookie 跨域
    "optionsSuccessStatus": 200 // options 请求返回状态码
}))
app.use(cookieParser())

/*app.use((req, res, next) => {
    console.log(`::000 ${req.method} ${req.baseUrl} ${req.httpVersion} ${res.statusCode}`)
    next()
})*/

app.use('/login', (req, res, next) => {

})

app.use('/sigin', (req, res, next) => {

})

app.use('/user', (req, res, next) => {
    console.log(cookieParser)
    console.log(req.params)
    console.log(req.cookies, 'cookie 内容');
    res.header('Set-Cookie', 'ua_token=39218397218931');
    res.send(200, 'ok');
})

app.use((req, res, next) => {
    // 返回 404
    let err = createError(404);
    next(err);
})

app.use((err, req, res, next) => {
    console.error(err.message);
    console.info(err);
    res.status(err.status || 500);
    res.json({errMsg: err.status})
    throw err // 给请求端返回错误信息后 抛出错误 node 服务关闭 pm2 会记录 throw 抛出的错误 之后重启服务
})

/*app.use('/', (req, res, next) => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            let random = Math.random()
            console.log(random)
            if (random < .5) {
                reject('error')
            } else {
                resolve(random)
            }
        })
    }).then((random) => {
        res.send(200, random)
    }).catch(err => {
        console.log(err)
        next(err)
    })
})

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('服务器出错了')
    throw err // 给请求端返回错误信息后 抛出错误 node 服务关闭 pm2 会记录 throw 抛出的错误 之后重启服务
})*/

/*
app.use('/', (req, res, next) => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            let random = Math.random()
            console.log(random)
            if (random < .5) {
                reject('error')
            } else {
                resolve(100)
            }
        })
    }).then(res => {
        console.log(res)
    }).catch(err => {
        // console.log(err)
        throw err
    })
    console.log(req.params);
    res.send(200, 'success')
})

process.on('uncaughtException', error => {
    // 语法 堆栈错误 promise.then().catch()
    console.error(err, 'promise')
    process.exit();
})

process.on('unhandledRejection', (reason, p) => {
    // 语法 堆栈错误 promise.then().catch()
    console.error(reason, 'promise not which catch', p)
})
*/
