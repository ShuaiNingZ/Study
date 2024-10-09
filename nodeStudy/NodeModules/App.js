const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

let myServer = http.createServer(function (request, response) {
    console.log(request.method) // 请求方式
    console.log(request.url) // 请求路径
    // console.log(request.httpVersion) // http 版本
    // response.end()
    // console.log(request.headers);

    // 监听请求内容获取
    request.on('data', (chunk) => {
        console.log('读取数据');
        // post requestContent 内容获取为 Buffer
        console.log(chunk.toString('utf8'))
    })

    // 监听请求内容获取完毕
    request.on('end', () => {
        console.log('读取完毕');
    })
    /*
    * Content-Type: application/x-www-form-urlencoded 表单内容 form data
    * */

    /*response.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf8'
    })
    response.write('这是 response 响应返回的信息')*/
    response.end();
})

myServer.listen(8080, () => {
    console.log(`http://localhost:8080`)
    console.log(`http://127.0.0.1:8080`)
})

// console.log(url.parse('http://127.0.0.1:8080/?user=123&pwd=123'))

/**
 * Accept 首部为客户端提供了一种将其喜好和能力告知服务器的方式, 包括他们
 * 想要什么, 可以使用什么, 以及最重要的, 他们不想要什么, 这样, 服务器就可以
 * 根据这些额外信息, 对要发送的内容做出更明智的决定. Accept 首部会使用连接
 * 的两端都受益, 客户端会得到他们想要的内容, 服务器则不会浪费其事件和带宽来
 * 发送客户端无法使用的东西
 *
 * Accept 告诉服务器能够请求哪些媒体类型
 * Accept-Charset 告诉服务器能够请求哪些字符集
 * Accept-Encoding 告诉服务器能够请求哪些编码方式
 * Accept-Language 告诉服务器能够请求哪些语言
 * TE11 告诉服务器可以使用哪些扩展传输编码
 *
 * 报文方法 Method
 * GET 从服务器获取一份文档
 * POST 向服务器法宗需要处理的数据
 * HEAD 执行服务器获取文档的首部
 * PUT 将请求的主体部分存储在服务器上
 * TRACE 对可能经过代理服务器传送到服务器上去的报文进行追踪
 * OPTIONS 决定可以再服务器上执行哪些方法
 * DELETE 从服务器上删除一份文档
 */





























