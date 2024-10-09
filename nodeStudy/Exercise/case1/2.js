const http = require('http');

const server = http.createServer();

const [
    port,
    host
] = [
    9009,
    '127.0.0.1'
]

server.on('request', (req, res) => {
    res.end(JSON.stringify({
        data: 'Hello world'
    }))
})

server.listen(port, host, () => {
    console.log(`服务启动: http://${host}:${port}`)
})
