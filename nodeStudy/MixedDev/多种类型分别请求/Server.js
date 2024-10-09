const http = require('http');
const url = require('url');

const server = http.createServer();

server.on('request', (req, res) => {
    let {pathname, search} = url.parse(req.url);
    let method = req.method.toUpperCase();
    let contentType = req.headers['Content-Type']
    // contentType = shuntContentType(contentType);
    // console.log(req)

    /*// 设置允许跨域的域名, * 代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 是否允许发送 Cookie
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // 允许的 header 类型
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, Authorization, token, Content-Type');
    // 允许跨域的请求方式
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
    // 可选, 用来指定本次遇见请求的有效期, 单位秒, 在此之间, 不用发出另一条预检请求
    res.setHeader('Access-Control-Max-Age', 1728000);*/

    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    })

    if (method === 'OPTIONS') {
        console.log(123123);
        // 注意 OPTIONS 请求尽量都返回结果, 这是跨域请求的预验证
        // res.end('ok');
        // return false
    }

    // res.writeHead(200, {
    //     'Content-Type': 'text/plain;charset=utf8'
    // })

    function urlParamsToObj(str) {
        return Object.fromEntries((str.match(/[^?&]+=[^?&]*/g) || []).map(item => item.split('=')))
    }

    if (pathname === '/user') {
        const {callback} = urlParamsToObj(search);
        let data = `${JSON.stringify({
            status: 200,
            data: '666'
        })}`;
        res.write(`window['${callback}'](${data})`)
        res.end()
        return
    }

    if (!(/json/.test(pathname))) {
        res.write('非 json pathname 请求');
        res.end();
        return false
    }

    if (method === 'PUT') {
        res.end('123123123')
    }

    if (method === 'POST') {
        res.on('data', function (chunk) {

        })

        res.on('end', function (chunk) {

        })
    }
})

server.listen('8008', '127.0.0.1', () => {
    console.log(`服务启动, 访问 http://127.0.0.1:8008`);
})

function shuntContentType(type) {
    const contentType = {
        'application/x-www-form-urlencoded': 'url',
        'multipart/form-data': "form",
        'text/plain': 'text',
        'application/json': 'json'
    }
    return contentType?.[type]
}

function mine(type) {
    return type?.split(';')[0]
}
