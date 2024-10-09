const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');

let server = http.createServer((req, res) => {
    const method = req.method;
    // console.log(url.parse(req.url))
    const {pathname, query} = url.parse(req.url);
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf8'
    })
    if (method.toLowerCase() === 'post' && pathname === '/data') {
        console.log(method, pathname, query)
        let name = querystring.parse(query)['name'];
        console.log(name)
    }
})

/*server.on('connection', function (socket ) {
    console.log('connection', socket)
})

server.on('request', function () {
    // console.log('request', arguments)
})*/

server.listen(8080, () => {
    console.log(`http://localhost:8080`)
})































