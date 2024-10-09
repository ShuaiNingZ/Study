const fs = require("fs");
const path = require("path");
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const assert = require('http-assert');
const createError = require('http-errors');
const mongoose = require('./plugins/db');
const { filesize } = require('./config')

const loginHtmlRouter = require('./routes/loginHtml');
const homeRouter = require('./routes/home');

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const verifyTokenRouter = require('./routes/verifyToken');
const getPublicKey = require('./routes/getPubKeys');
const uploadRoute = require('./routes/upload');
const searchRoute = require('./routes/search');
const artLikesRoute = require('./routes/artLikes');

const resourceMiddleware = require('./middleware/resource')
const { authTokenMiddleware } = require('./middleware/auth')

const { busRoute } = require('./routes/bus');

const protocol = 'http';
const host = '127.0.0.1';
// const host = '10.73.135.203';
const port = 3000;
const app = express();
const server = app.listen(
    port,
    host,
    () => {
        console.log(`服务启动, 访问 ${ protocol }://${ host }:${ port }`);
    }
)

app.use(cors({
    "origin": true, // true 设置为 req.origin.url
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // 容许跨域请求的方式
    "allowedHeaders": "x-requested-with,Authorization,token,content-type,Cookies", // 跨域请求头
    "preflightContinue": false, // 是否通过 next() 传递 options 请求 给后续中间件
    "maxAge": 1728000, // options 预验结果缓存时间 20 天
    "credentials": true, // 携带 cookie 跨域
    "optionsSuccessStatus": 200, // options 请求返回状态码
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.use(express.static('uploads'))

app.use('/api/v1/intent/userInput', (req, res, next) => {
    setTimeout(() => {
        res.send({
            code: 200,
            msg: '',
            timestamp: '',
            data: {
                returnMessage: '测试测试测试?<br/>测试测试测试\/n测试测试测试?\/n测试测试测试?\/n测试测试测试\/n?测试测试测试\/n?测试测试测试\/n?测试测试测试?\/n测试测试测试?\/n测试测试测试?',
                schemeInfo: '123123',
                productScheme: '',
                serviceName: '',
                sessionId: '',
                customNo: '',
                startTime: '',
                endTime: '',
                frequence: '',
                orderInfo: {
                    isExistsRelatedSerialNo: '',
                    mainOrderNo: '',
                    orderNum: '',
                    subOrderNoList: '',
                    orderNo: '',
                    serialNo: '',
                    businessType: '',
                    handlerOverTime: '',
                    contractNo: '',
                    contractName: '',
                    busiInstallSce: '',
                    serviceType: '',
                    actionCode: '',
                    businessScene: '',
                }
            }
        })
    }, 4000)
})

app.use('/api/v1/intent/schemeConfirm', (req, res, next) => {
    setTimeout(() => {
        res.send({
            code: 200,
            msg: '',
            timestamp: ''
        })
    }, 2000)
})

let count = 0;
app.use('/api/v1/intent/getResult', (req, res, next) => {
    count++
    if (count === 2) {
        count = 0;
        res.send({
            code: 200,
            msg: 'success',
            timestamp: '',
            data: {
                returnMessage: '成功了'
            }
        })
    } else {
        setTimeout(() => {
            res.send({
                code: 200,
                msg: '',
                timestamp: '',
                data: {
                    returnMessage: '失败了'
                }
            })
        }, 1000)
    }
})

app.use('/AbortController', (req, res, next) => {
    setTimeout(() => {
        res.send({
            code: 200,
            msg: '',
            timestamp: '',
            data: {
                returnMessage: '成功'
            }
        })
    }, 2000)
})

app.use('/text/event-stream', (req, res, next) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
    })

    setInterval(() => {
        // 事件要用两个\n结束
        res.write('data: The server time is: ' + new Date() + '\n\n');
    }, 3000);
    req.connection.addListener('close', () => {
        console.log('SSE connection closed!');
    }, false);
})

app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
})

app.use(authTokenMiddleware);

app.use('/api/v1/rest/:resource', resourceMiddleware(), busRoute);

// 断言
app.use('/test', (req, res, next) => {
    let isMe = false;
    assert(isMe, 422, '请求错误')
    res.send(200, { data: 'hahah' })
    // 相当于
    // if (isMe) {
    //     res.send(200, { data: 'hahah' })
    // } else {
    //     next(createError(422, '请求错误'))
    // }
})

// 页面
app.use('/home', homeRouter);
app.use('/loginHtml', loginHtmlRouter);

// 接口
// 无需 token 接口
app.use('/login', loginRouter)
app.use('/register', registerRouter)

// 获取公钥
app.use('/publicKey', getPublicKey)

// 文件上传
app.use('/upload', uploadRoute)

// 文章搜索
app.use('/search', searchRoute)

// 文章点赞
app.use('/likes', artLikesRoute)

app.get('/cookie', (req, res) => {
    console.log('Cookies', req.cookies)
    console.log('Signed Cookies: ', req.signedCookies)
    res.send('')
})

/*
// 需要 token 接口
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({
            data: {
                status: 403,
                msg: '没有 token'
            }
        })
    }

    jwt.verify(
        token,
        fs.readFileSync(path.join(process.cwd(), '/auth/public.cer'), 'utf8'),
        (err, decoded) => {
            if (err) {
                return res.send({
                    data: {
                        status: 401,
                        msg: 'token 失效'
                    }
                })
            }
            console.log(decoded)
            res.userId = decoded.userId;
            next();
        }
    )
});
*/

app.use('/verifyToken', verifyTokenRouter);

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    const ERROR_MAP = {
        'LIMIT_PART_COUNT': 'Too many parts',
        'LIMIT_FILE_SIZE': `文件大小不得大于超过${ filesize } 字节`,
        'LIMIT_FILE_COUNT': 'Too many files',
        'LIMIT_FIELD_KEY': 'Field name too long',
        'LIMIT_FIELD_VALUE': 'Field value too long',
        'LIMIT_FIELD_COUNT': 'Too many fields',
        'LIMIT_UNEXPECTED_FILE': 'Unexpected field',
        'MISSING_FIELD_NAME': 'Field name missing'
    }

    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err.code in ERROR_MAP) {
        res.send(200, {
            code: 500,
            data: {
                msg: ERROR_MAP[err.code]
            }
        })
    } else {
        // console.log(err)
        res.status(err.status || 500).send({
            code: err.code,
            data: err.data
        })
    }
})

