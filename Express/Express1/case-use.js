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

/**
 * 中间件的优点 -- 模块化
 * 中间件的最大优点就是模块化, 每一个中间件是一个独立的函数, 实现一个特定的功能,
 * 然后通过 app.use 将这个函数整合起来, 抽离出来就是一个单独的模块
 *
 * 中间件分为两种:
 *      1. 应用中间件
 *      2. 路由中间件
 */
app.use((req, res, next) => {
    console.log('中间件1')
    next(); // 相当于调用下一次 app.use 中的回调处理函数
})
app.use((req, res, next) => {
    console.log('中间件2')
    res.write('123123');
    next();
})
app.use((req, res, next) => {
    console.log('中间件3')
    res.end('hello');
})
app.use((req, res, next) => {
    console.log('中间件4')
})

app.listen(port, function () {
    console.log(`服务启动, 访问 ${protocol}://${host}:${port}`);
})

/**
 * 请求开始 => 处理流程[中间件1, 中间件2, 中间件3]
 */

/**
 * 通信
 * 通信分层管理 TCP/IP
 * 应用层 HTTP FTP DNS 在这一层工作
 * 传输层 相对于 应用层 提供处于网络连接中的两台计算机(客户端的电脑, 服务端的电脑)的数据传输 TCP/UDP
 * 网络层 处理网络上流动的数据包 IP 协议(电脑的门牌号) ARP 协议
 * 链路层 用于处理网络连接中的硬件部分 系统 驱动 硬件 通信线材 以太网协议(Ethernet)
 */

/**
 * 请求和响应的报文组成
 * 请求起始行
 * GET / HTTP/1.1
 * 请求首部
 * 请求主题
 * https://www.rfc-editor.org/rfc/pdfrfc/rfc7231.txt.pdf
 * GET 用来请求访问已被 URI 识别的资源 获取指定地址资源的方法
 * POST 方法用来传输实体的主体 设计 POST 就是为了提交数据内容主体 给服务端
 * PUT 主要用来传输文件 HTTP/1.1 PUT 没有验证机制 有安全隐患
 * DELETE 用来删除服务器上的文件资源 安全隐患
 * HEAD 主要用来确认 URI 的时效性和有效性, 不会返回报文的主体内容 (通常用来获取服务器时间)
 * OPTIONS 用来针对请求的 URI 指定资源你的方法 (浏览器验证请求)
 */

/**
 * 误区
 * 1. get 不能发送 body 内容 误区:
 *  RFC(Request For Comments) 协议标准 规范不推荐使用 GET 提交内容
 * 2. post 比 get 安全 误区
 * 3. get 请求有字节限制 IE url 地址栏限定字符长度有限
 */

/**
 * 状态码
 * 状态码的职责是客户端向服务端发送请求的时候 描述返回的请求结果
 * 客户端借助状态码可以快速了解这次请求是否得到了服务端的正常处理
 * 1xx 接受的请求正在处理 信息性状态码
 * 2xx 请求正常处理完毕 成功状态码
 *      200 成功
 *      204 No Content 响应报文中没有主体内容
 * 3xx 需要进行附加操作才能完成的请求 比如 重定向
 *      301 永久性重定向
 *      302 临时重定向
 *      303 同一个资源有多个地址
 *      304 强制缓存 请求带有附加条件的时候 if 服务端容许访问请求资源, 但是资源没有满足请求条件
 *          所以 304 重定向直接使用客户端缓存资源
 * 4xx 服务端无法处理请求 客户端错误状态码
 *      400 错误请求 有语法错误 请你改正请求内容重新发送
 *      401 需要认证后才能访问
 *      403 服务器拒绝访问, 不仅拒绝了你还不想和你说话
 *      404 你所请求的资源 不存在
 * 5xx 服务器处理请求错误 服务端错误状态码
 *      500 服务器运行错误 有 bug 宕机了
 *      503 服务器正在超负荷运作或者正在维护
 */

/**
 * 报文解析
 * 报文头分为 请求头 和 响应头
 *  请求头
 *      accept: 用户代理可以处理的媒体类型 (告诉服务器, 我能处理什么)
 *      Accept-Encoding: 优先的内容编码(压缩编码 普通编码)
 *      Accept-Language: 优先处理的语言(自然语言)
 *      Proxy-Connection: 代理服务器连接状态
 *      Sec 开头系列: chrome 添加的 请求客户端的一些信息
 *      Expect: 期待服务器的特定行为
 *      if-Modified-Since: 比较资源的更新信息(缓存)
 *      User-Agent: 发送请求的客户端的信息
 *  响应头
 *      响应首部字段
 *          ETag: 资源的匹配信息
 *      实体首部字段
 *          Content-Length 实体主体大小(字节)
 *          Content-Type 实体主体类型(MIME 类型)
 *          Content-Location 替代对应资源的 URI 重定向
 *          Content-Language 实体主体的自然语言
 *          Content-Encoding 实体主体的编码方式
 *          Allow 资源可以支持的 HTTP 方法
 */

/**
 * 简单请求 和 非简单请求
 * 简单请求 Content-Type: 只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain
 * application/x-www-form-urlencoded: 传参 key=value&key=value
 * multipart/form-data 表单对象
 * text/plain 字符串
 *
 * 非简单请求都会发起与验证 OPTIONS
 * 只有 OPTIONS 请求通过才会发送客户端实际请求
 */

/**
 * 客户端请求方式
 *
 * form 表单提交 enctype 决定提交的实体首部的 content-type
 * 非文件提交 application/x-www-form-urlencoded
 * 带文件提交 multipart/form-data
 */

/**
 * 当做 携带 Token 或自定义 请求头的请求 Access-Control-Allow-Origin 不能设置为 * 号,
 * 必须为指定来源 request.header.origin,
 * response.setHeader('Access-Control-Allow-Credentials', true) 允许携带 cookie 信息
 *
 */

