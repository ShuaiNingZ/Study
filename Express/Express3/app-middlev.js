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
 * 中间件 (三种)
 * 应用中间件
 *      任何请求到访, 不识别路由
 *      单纯对所有 request 做基础的处理
 *      记录访问 IP count 计数
 *
 *      例: 获取 request 请求内容 解析之后 挂载到 req.query  req.body
 *      对于请求通用级的处理
 *      app.use((req, res, next) => {})
 *
 * 路由中间件
 *      区分不同请求的路由, 实现对应引导和业务办理
 * 错误处理中间件
 */

// 应用中间件
// 纪律访问 IP count 计数
app.use((req, res, next) => {
    let ip = req.ip;
    console.log(ip)
    // 日志文件中添加 一条 ip 访问信息 日志中更新 当日访问总数
    next()
})

// 路由中间件
app.use('/login', (req, res, next) => {
    // 根据 req 参数获取 用户名 密码 进行登录验证 验证结果 res 返回
    let {username} = req.query;
    console.log(username)
    if (username !== '秋') {
        let err = new Error(`用户名称${username}错误, 非管理员用户`);
        next(err)
    }
})

// 错误处理中间件
app.use((err, req, res, next) => {
    console.log(err)
    console.log(err.message)
})




















