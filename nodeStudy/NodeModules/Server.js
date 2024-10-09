const http = require('http');

const server = http.createServer((request, response) => {
    console.log('服务器被访问了', request)

    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain;charset=utf-8')
    response.end('你好, 世界')
})

server.listen(8080, () => {
    console.log('服务器运行中', `http://localhost:8080`)
})
