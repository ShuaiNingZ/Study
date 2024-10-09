const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');

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

// 调用 内置 express 应用中间件 json() 处理 content-type 为 application/json
// 的请求内容解析后挂载到 req.body 上
app.use(express.json({
    limit: 100
}));

// 处理 content-type 为 x-www-urlencode 的请求内容解析后挂载到 req.body 上
app.use(express.urlencoded({
    extended: true
}));

// 处理静态资源请求的中间件 static
// http://127.0.0.1:8008/images/8.png
// 在实际开发中不会使用 node 处理静态文件 是使用 nginx 代理静态资源
app.use(express.static(path.join(__dirname, 'public'), {
    fallthrough: false
}));

app.use('/images/*', (req, res, next) => {
    console.log(req.baseUrl)
    if (req.baseUrl === '/images/1.png') {
        fs.rename('./public/1.png', './public/images/1.png', () => {
            console.log('文件放置成功')
            next()
        })
    }
})

// 解析 urlencode 请求内容
app.use('/login/:auto', (req, res, next) => {
    console.log(req.body);
    // req.on('data', chunk => {
    //     console.log(chunk.toString('utf8'));
    // })
    // express.json 中间件 会处理 request 中 json 的请求内容
    // 解析后 挂载到 req.body 上 并且 已经 JSON.parse
    res.status(200).send('success')
})

app.use('/sigin', (req, res, next) => {
    console.log(req.body);
    res.status(200).send('success')
})

function all(arr = []) {
    return new Promise(resolve => {
        let index = 0;
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            arr[i]().then(res => {
                result[i] = res;
                index++;

                if (index == arr.length) {
                    resolve(result)
                }
            })
        }
    })
}


