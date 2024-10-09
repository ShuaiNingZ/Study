const express = require('express');
const http = require('http');
const loginRouter = require('./routes/login')

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

// 路由中间件
// path/path/search?query
app.use('/login', loginRouter);
