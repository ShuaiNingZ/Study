/**
 * Web 内容都是存储在 Web 服务器上的. Web 服务器所使用的是 HTTP 协议, 因此经常会被称为 HTTP 服务器.
 * 这些 HTTP 服务器存储量因特网中的数据, 如果 HTTP 客户端发出请求的话, 他们会提供数据. 客户端向服务器
 * 发送 HTTP 请求, 服务器会在 HTTP 响应中回复所请求的数据, HTTP 客户端(比如浏览器) 和 HTTP 服务端共同
 * 构成了万维网的基本组件
 *
 * MIME(Multipurpose Internet Mail Extension) 多用途因特网邮件扩展
 * 因特网上有数千种不同的数据类型, HTTP 仔细的给每种要通过 Web 创术的对象打上了名为 MIME 类型 (MIME type)
 * 的数据格式标签. 最初设计 MIME (Multipurpose Internet Mail Extension) 多用途因特网邮件拓展 是为了解决
 * 在不同的电子邮件系统之间搬移报文时存在的问题. MIME 在电子邮件系统中工作的非常好, 因此 HTTP 也采纳了它,
 * 用它来描述并标记多媒体内容.
 * Web 服务器会在所有 HTTP 对象数据附加一个 MIME 类型当 Web 浏览器从服务器中取回一个对象时, 会去查看相关的
 * MIME 类型, 看看他是否知道应该如何处理这个对象. 大多数浏览器都可以处理数百种常见的对象类型: 显示图片文件,
 * 解析并格式化 HTML 文件, 通过计算机声卡播放音频文件, 或运行外部插件软件来处理特殊格式的数据
 * MIME 类型是一种文本标记, 表示一种主要的对象类型和一个特定的子类型, 中间由一条斜杠来分隔
 * HTML 格式的文本文档由 text/html 类型来标记
 * 普通的 ASCII 文本文档由 text/plain 类型来标记
 * ...
 * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
 *
 * 网络地址的基本信息
 * 每个 Web 服务器资源都有一个名字, 这样客户端就可以说明他们感兴趣的资源是什么. 服务器资源名被称为统一资源标识符
 * (Uniform Resource Identifier, URI). URI 就像因特网上的邮政地址一样, 在世界范围内唯一标识并定位信息资源
 * 统一资源定位符 (URL) 是资源标识符最常见的形式. URL 描述了一台特定服务器上某资源的特定位置. 它们可以明确说明
 * 如何从一个精确、固定的位置获取资源.
 * 大部分 URL 都遵循一种标准格式, 这种格式包含三个部分 (现在几乎所有的 URI 都是 URL):
 * 1. URL 的第一部分被称为方案 (scheme), 说明了访问资源所使用的协议类型. 这部分通常就是 HTTP 协议. (http://)
 * 2. 第二部分给出了服务器的因特网地址. (www.baidu.com)
 * 3. 其余部分指定了 Web 服务器上的某个资源. (/image)
 *
 * HTTP 请求的事务逻辑
 * 一个 HTTP 事务由一条 (从客户端发往服务器的) 请求命令和一个 (从服务器发回客户端的) 响应结果组成.
 * 这个通信是通过名为 HTTP 报文 (HTTP message) 的格式化数据块进行的.
 *
 * HTTP 请求的事务逻辑之报文
 * HTTP 报文是由一行一行简单字符串组成的, HTTP 报文都是纯文本, 不是二进制代码, 所以人们可以很方便的对其进行读写.
 * 从 Web 客户端发送 Web 服务器的 HTTP 报文称为请求报文 (request message).
 * 从服务器 发往客户端的报文称为响应报文 (response message).
 * HTTP 报文包括以下三个部分:
 * 1. 起始行
 * 报文的第一行就是起始行, 在请求报文中用来说明要做些什么, 在响应报文中说明出现了什么情况.
 * 2. 首部字段
 * 起始行后面有零个或多个首部字段. 每个首部字段都包含一个名字和一个值, 为了便于解析, 两者之间用冒号 (:) 分隔.
 * 首部以一个空行结束. 添加一个首部字段和添加新行一样简单.
 * 3. 主体
 * 空行之后就是可选的报文主题了, 其中包含了所有类型的数据.
 * 请求主体中包含了要发送给 Web 服务器的数据. 响应主体中装载了要返回给客户端的数据.
 * 起始行和首部都是文本形式且都是结构化的, 而主体则不痛, 主体中可以包含任意的二进制数据 (比如: 图片、视频、音频、软件程序等).
 * 当然, 主体重也可以包含文本.
 *
 * HTTP 请求的事务逻辑之连接
 * HTTP 是个应用层协议. HTTP 无需操心网络通讯的具体细节, 他把联网的细节都交给了通用、可靠的因特网传输协议 TCP/IP.
 * 只要建立了 TCP 连接, 客户端和服务器之间的报文交换就不会丢失、不会被破坏, 也不会再接收时出现错徐了.
 * HTTP (应用层)、TCP (传输层)、IP (网络层)、网络特有的链路接口 (数据链路层)、物理网络硬件 (物理层)
 * TCP 提供了: (用网络术语来说: HTTP 协议位于 TCP 的上层. HTTP 使用 TCP 来传输其报文数据.)
 * 1. 无差错的数据传输
 * 2. 按需传输 (数据总是会按照发送的顺序到达)
 * 3. 未分段的数据流 (可以在任意时刻以任意尺寸将数据发送出去)
 *
 */

const http = require('nodeStudy/oldModule/http');
const server = http.createServer((req, res) => {
    console.log(req.headers)
    console.log(req.rawHeaders)
    console.log(req.httpVersion)
    console.log(req.method)
    console.log(req.url)
    res.writeHead(200, {
        "Content-type": "text/plain;charset=utf-8"
    })
    let msg;
    switch (req.url) {
        case "/":
            msg = "this is index"
            break;
        case "/login":
            msg = "this is login"
            break;
        default:
            msg = "this is other"
            break
    }
    res.write(msg)
    res.end()
})

server.listen(8000, () => {
    console.log('服务启动成功, 访问: http://localhost:8000')
})
