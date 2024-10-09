const http = require('http');
const url = require('url');
const querystring = require('querystring');
const multiparty = require('multiparty');

const server = http.createServer();

/**
 * 如何划分简单请求和非简单请求, 非简单请求会有一个 CORS 的 OPTIONS 预验请求
 * 1. 请求方法是 HEAD、GET、POST
 * 2. 请求头信息不超过以下几个字段
 *      Accept
 *      Accept-Language
 *      Content-Language
 *      Last-Event-ID
 *      Content-Type: 只限于
 *          application/x-www-form-urlencoded、
 *          multipart/form-data、
 *          text/plain
 */

/**
 * 解决跨域请求:
 *      Access-Control-Allow-Origin 是必须的, 它的值要么是请求时 Origin 字段的值,
 *      要么是 * (表示接受任意域名的请求)
 *
 *      Access-Control-Allow-Credentials 是一个布尔值, 表示是否允许发送 Cookie,
 *      默认情况下是 false, Cookie 不包括 CORS 请求中, 设置 true, 即表示服务器明确
 *      许可, Cookie 可以包含在请求中, 一起发送给服务器.
 *
 *      Access-Control-Expose-Headers 可选, CORS 请求时, XMLHttpRequest 对象的
 *      getResponseHeader() 方法只能拿到 6 个基本字段: Cache-Control、Content-Language、
 *      Content-Type、Expires、Last-Modified、Pragma, 如果想拿到其他字段, 就必须在
 *      Access-Control-Expose-Headers 里面指定
 *
 *      Access-Control-Allow-Methods 可选, 允许跨域请求的方式
 *
 *      Access-Control-Max-Age 可选, 用来指定本次预验请求的有效期, 单位秒. 在此期间, 不用发
 *      出另一条预验请求
 */

/**
 * cookie 解决了什么问题
 *      1. HTTP 是无连接的, 当请求结束连接就会中断所以会产生身份识别的问题
 *      2. 当浏览器访问服务器时, 服务器会向浏览器发送一个 cookie, 可以理解为标识符,
 *          下次浏览器再向服务器发送请求时在上行报文中携带这个标识符
 *      3. 服务器就能够根据标识符做出识别, 当服务器在下行报文中设置 cookie 的持续时间
 *      4. 那么浏览器在一定时间内访问该服务器都会携带这个 cookie
 *      5. 所以 cookie 就是一个浏览器跟服务器通讯的信物, 这个基础是建立在 HTTP 无连接
 *      6. cookie/session 的出现就是为了解决 http 协议无状态的弊端, 为了让客户端和服务
 *      端建立长久联系而出现的
 *
 * cookie 属性:
 *      Name: 键值对的 key
 *
 *      Value: 键值对的 value
 *
 *      Domain: 可以访问该 Cookie 的域名. 如果设置为 .google.com, 则所有以 google.com
 *      结尾的域名都可以访问该 Cookie. 第一个字符必须为 '.'
 *
 *      Path: 指定可访问 cookie 的目录, 例如: userId = 320; path=/shop; 就表示当前 cookie
 *      仅能在 shop 目录下使用
 *
 *      Expires/Mas-Age: 指定过期时间; 其中 GMT_String 是以为 GMT 格式表示的时间字符串, 超过这个
 *      时间, cookie 将失效
 *
 *      HttpOnly: 这是微软对 cookie 做的扩张, 如果在 cookie 中设置了 HttpOnly 属性, 那么通过程序
 *      将无法读取到 Cookie 信息, 能够防止 XSS 攻击
 *
 *      Secure: 该 Cookie 是否仅被使用安全协议传输, 安全协议, 安全协议有 HTTPS, SSL 等, 在网络上传输
 *      数据之前先将数据加密, 默认为 false
 *
 *      SameSize: 用来防止 CSRF 攻击和用户追踪
 *      注意: 如果 Cookie 不设置过期时间, 当浏览器关闭的时候 cookie 就会消失
 */

server.on('request', (req, res) => {
    // console.log(url.parse(req.url))
    const {pathname, query} = url.parse(req.url);
    console.log(req.headers)
    // 后端向前端设置 Cookie 注意 SameSite=None; Secure;
    res.setHeader('Set-Cookie', ['test=cookieSuccess; HttpOnly; Path=/; SameSite=None; Secure;'])
    // 当前端使用 ajax withCredentials 为 true 时, 后端 Access-Control-Allow-Origin 不能为 *
    // 必须设置为 请求源 req.headers.origin
    res.writeHead(200, {
        'Access-Control-Allow-Origin': req.headers.origin,
        'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token,content-type,Cookies',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'text/plain;charset=utf8'
    })
    //  This attempt to set a cookie via a Set-Cookie
    //  header was blocked because it had the "SameSite=Strict"
    //  attribute but came from a cross-site response which was
    //  not the response to a top-level navigation.

    if (req.method === 'OPTIONS') {
        console.log('OPTIONS')
        res.end();
    }

    if (req.method === 'GET') {
        res.write(JSON.stringify(querystring.parse(query)))
        res.end();
    }

    if (req.method === 'POST') {
        const form = new multiparty.Form({
            uploadDir: './upload'
        });
        form.parse(req, function (err, fields, files) {
            // res.writeHead(200, {'Content-type': 'text/plain'});
            console.log(fields, files);
        });
        res.write(JSON.stringify({
            status: 200,
            message: '请求成功'
        }));
        res.end();
    }
})

server.listen('8008', '127.0.0.1', () => {
    console.log('监听服务: http://127.0.0.1:8008')
})

