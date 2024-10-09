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

/**
 * 应用中间件
 * 不过滤对应的请求地址
 * app.use()
 *
 * 路由中间件
 * 加入路径, 指定路由
 * 中间件可以嵌套传参
 * app.use('/')
 * app.get('/')
 * app.post('/')
 * app.delete('/')
 * app.put('/')
 */
app.use('/', (req, res, next) => {
    console.log('use 不区分 request 的 method 进行捕获')
    next()
})

app.get('/', (req, res, next) => {
    console.log('get 捕获 request.method 是 GET 的请求')
    next()
})

app.post('/', (req, res, next) => {
    console.log('post 捕获 request.method 是 post 的请求')
    next()
})

app.delete('/', (req, res, next) => {
    console.log('delete 捕获 request.method 是 delete 的请求')
    next()
})

app.put('/', (req, res, next) => {
    console.log('put 捕获 request.method 是 put 的请求')
    next()
})

app.use((req, res, next) => {
    res.send('success')
})
