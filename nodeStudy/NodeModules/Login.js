const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

http.createServer((req, res) => {
    let reqMethod = req.method;
    let reqUrl = req.url;
    let pathname = url.parse(reqUrl).pathname;

    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf8'
    })

    if (pathname !== '/user') {
        res.write('只对用户登录开放, 请回吧')
        res.end()
        return false;
    }

    if (reqMethod === 'GET') {
        res.write('不接受 get 请求, 请回吧')
        res.end()
        return false;
    }

    let contentType = mime(req);
    if (contentType.trim() !== 'application/x-www-form-urlencoded') {
        res.write('只接受表单请求, 请回吧')
        res.end()
        return false;
    }

    let reqContentLen = req.headers['content-length'];
    if (reqContentLen.trim() === 0) {
        res.write('不存在请求内容, 请回吧')
        res.end()
        return false;
    }

    // 获取请求内容后, 根据 user 字段的值 返回 欢迎你, 尊贵的${user}
    req.on('data', (chunk) => {
        let query = chunk.toString('utf8');
        let reqData = querystring.parse(query);
        if (!reqData['user'] || reqData['user'].trim().length === 0) {
            res.write('用户名不能为空')
            res.end()
            return false;
        }

        if (!reqData['pwd'] || reqData['pwd'].trim().length === 0) {
            res.write('密码不能为空')
            res.end()
            return false;
        }

        if (reqData['pwd'] !== '123') {
            res.write('密码不正确')
            res.end()
            return false;
        }

        res.write(`欢迎登录系统, 尊敬的${reqData['user']}`)
        res.end()
    })

    req.on('end', () => {
        console.log('请求数据获取完毕')
    })
}).listen(8080)

function mime(req) {
    const mimeType = req.headers['content-type'];
    return mimeType.split(';')[0]
}























