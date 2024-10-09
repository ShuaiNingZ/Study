const http = require('http');
const url = require('url');
const querystring = require('querystring');
const multiparty = require('multiparty');

const server = http.createServer();

// POST
server.on('request', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'X-Powered-By': '3.2.1'
    })
    let body = '';
    console.log(req.method)
    res.write(JSON.stringify({
        date: new Date(),
        token: '123123'
    }))
    res.end()
    /*if (req.method === 'GET') {
        // console.log(url.parse(req.url))
        const {query} = url.parse(req.url);
        const queryData = querystring.parse(query);
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end(decodeURIComponent(query))
    }
    if (req.method === 'POST') {
        // 默认 content-type application/x-www-form-urlencoded
        // res.writeHead(200, {'Content-Type': 'text/plain;charset=utf8'});
        const form = new multiparty.Form({
            uploadDir: './upload'
        });

        form.parse(req, (err, fields, files) => {
            res.writeHead(200, {'Content-type': 'text/plain;charset=utf8'});
            console.log(fields, files)

            res.end('123123')
        })

        /!*req.on('data', (chunk) => {
            console.log(chunk.toString('utf8'))
            body += chunk;
        })

        req.on('end', () => {
            body = querystring.parse(body);
            console.log(body)
            console.log('读取完毕')
        })*!/
    }*/
})

server.listen(8008, '127.0.0.1', () => {
    console.log('服务启动, 访问 http://127.0.0.1:8008');
});

