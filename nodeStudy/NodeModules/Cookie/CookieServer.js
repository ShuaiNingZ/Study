const http = require('http');

http.createServer((req, res) => {
        // console.log(res, req)
        res.writeHead(200,
            {
                'Content-Type': 'text/plain;charset=utf8',
                'Set-Cookie': 'token=hahah'
            }
        );
        res.write('测试');
        res.end()
    })
    .listen(8000, () => {
        console.log(`http://localhost:8001`)
    })

/**
 * 1. 前端表单提交内容请求, node 如何解析
 *      1. get
 *          请求会拼接到 URL 上
 *          pathname?key=value&key=value
 *          node 使用 url.parse 方法 切割得到对象
 *      2. post
 *          1. 有文件 => 前端提交需要设置 enctype 属性设置, 请求头 content-type 为 multipart/form-data
 *          2. 没有文件 => 前端提交需要设置 enctype 属性设置, 请求头的 content-type 为 application/x-www-form-urlencoded
 *              将表单解析为 key=value&key=value
 *
 * 2. node response 返回内容
 *      1. res.writeHead() 设置返回的首部
 *          根据返回的内容设置对应的 MIME Content-Type:MIME
 *      2. res.write() 设置返回内容 (响应主体)
 *      3. res.end() 表示返回结束-关闭返回通道 之后无法继续 res.write 或者 res.end()
 */

/**
 * 1. 客户端向服务端发起请求服务端可以获取客户端的 cookie
 * 2. 发起请求的来源, 不局限于 ajax get post ajax form link script img a
 * 3. 服务器 B 页面 B 里面有一个 恶意的 img 不可见标签 src 请求服务器 A, 服务器 A 就可以
 *      获取 客户端 B 在访问服务器 B 的时候的 cookie
 */


























