const http = require('http');
const url = require('url');
const querystring = require('querystring');
const multiparty = require('multiparty');

const server = http.createServer();

// GET
server.on('request', (req, res) => {
    if (req.method === 'GET') {
        // console.log(url.parse(req.url))
        const {query} = url.parse(req.url);
        const queryData = querystring.parse(query);
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end(decodeURIComponent(query))
    }
})

// POST
server.on('request', (req, res) => {
    let body = '';

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    if (req.method === 'POST') {
        // 默认 content-type application/x-www-form-urlencoded
        // res.writeHead(200, {'Content-Type': 'text/plain;charset=utf8'});

        const form = new multiparty.Form({
            uploadDir: './upload'
        });

        form.parse(req, (err, fields, files) => {
            res.writeHead(200, {'Content-type': 'text/plain'});
            console.log(fields, files)
        })
        res.end()
    }
})

server.listen(8008, '127.0.0.1', () => {
    console.log('服务启动, 访问 http://127.0.0.1:8008');
});
