const express = require('express');
const http = require('http');

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

app.use('/static', express.static('public'));

app.use(function (req, res, next) {
    console.log('LOGGED')
    next()
})

app.use(function (req, res, next) {
    req.requestTime = Date.now()
    next()
})

app.get('/', function (req, res) {
    res.send(`Hello World!${req.requestTime}`);
})

app.use((req, res, next) => {
    console.log(1)
    next()
    console.log(2)
})

app.use((req, res, next) => {
    console.log(3)
    next()
    console.log(4)
})

app.use((req, res, next) => {
    console.log(5)
    next()
    console.log(6)
})

// 洋葱模型 事件会在中间件层之间 顺序传递 所有中间件层 调用结束后 事件冒泡传递
// 模块化处理流程中 条件后决 灵活处理

app.use((req, res, next) => {
    console.log(req['queryNameA'], 'into 1')
    next()
    console.log(req['queryNameA'], 'into 2')
})

app.use((req, res, next) => {
    console.log(req['queryNameA'], 'into 3')
    req['queryNameA'] = 'zsntest'
    next()
    console.log(req['queryNameA'], 'into 4')
})

// /set/* *会存储在 req.params['prop']
// http://127.0.0.1:8008/set/name?key=hahah
app.use('/set/:prop', (req, res, next) => {
    const {params, query} = req;
    app.set(params.prop, query.key)
    res.send('ok')
})

server.on('listening', () => {
    console.log('端口 8008 建立连接')
})

server.on('request', (req) => {
    console.log(`${app.get('name')} 获取 express 中存储的 name 属性`);
    const {
        url,
        baseUrl,
        originalUrl,
        params,
        query,
    } = req;
    console.log('url', url)
    console.log('baseUrl', baseUrl)
    console.log('originalUrl', originalUrl)
    console.log('params', params)
    console.log('query', query)
    console.log(`请求来自: ${req.url}`)
})
