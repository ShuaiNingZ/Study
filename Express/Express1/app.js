const express = require('express');
const http = require('http');
const path = require('path');
const url = require('url');

const app = express();
const protocol = 'http';
const host = '127.0.0.1';
const port = 8008;

// 调用内置中间件 以 urlencoded 方法来解析 request 请求内容
app.use(express.urlencoded());

// app.get('/', (req, res, next) => {
//     res.send('Hello World!');
// })

app.use('/user', function (req, res, next) {
    // http://127.0.0.1:8008/user?name=哈哈哈&pwd=123
    // baseUrl: 请求资源的地址路径 /user
    console.log('baseUrl:', req.baseUrl);
    // method: 请求方式
    console.log('method:', req.method);
    // body: post 请求的请求体
    console.log('body:', req.body);
    // params: 二级 path 路径的匹配值 {} params.path => get
    console.log('params:', req.params);
    // cookies: request 客户端携带 cookie
    console.log('cookies:', req.cookies);
    // hostname: 请求主机地址
    console.log('hostname:', req.hostname);
    // query: ?后面的参数 转为对象形式
    console.log('query:', req.query);
    // 获取 content-type
    console.log('content-type', req.get('content-type'));

    // 请求头 contentType application/json; charset=utf-8
    // res.json({name: 'express', age: '4.x'});

    // 请求头 contentType text/html; charset=utf-8
    // 动态根据参数内容设置对应的响应 content-type
    // res.send('你好 Express');

    // 请求头 contentType image/png
    // res.sendFile(path.join(__dirname, '/public/image/8.png'));

    // http://127.0.0.1:8008/user?callback=Fn
    // 请求头 contentType text/javascript; charset=utf-8
    // res.jsonp({name: 'EXP', age: '4.x'})
    // 前端收到 /**/ typeof Fn === 'function' && Fn({"name":"EXP","age":"4.x"});

    // 请求头 contentType text/html; charset=utf-8
    // res.sendFile(path.join(__dirname, '/views/a.html'));

    // res.json({path: req.baseUrl});
    next();
})

app.use('/user/get', function (req, res, next) {
    res.json({path: req.baseUrl});
})

app.use(function (req, res, next) {
    res.status(404);
    res.send('警告 非法访问 找不到页面')
})

app.listen(port, function () {
    console.log(`服务启动, 访问 ${protocol}://${host}:${port}`);
})
