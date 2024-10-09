// 日期块
const moment = require('moment');
console.log(moment().format('YYYY-MM-DD'))

// 服务块
const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', function (req, res) {
    switch (req.url) {
        case "/":
            fs.readFile("./ParticleLine.html", "utf8", (err, data) => {
                if (err) res.end('404 Not Found');
                res.setHeader('Content-Type', "text/html;charset=utf-8")
                res.write(data)
                res.end()
            })
            break;
        default:
            break;
    }
})

server.listen("8080", () => {
    console.log('启动成功, 访问: http://localhost:8080')
})
