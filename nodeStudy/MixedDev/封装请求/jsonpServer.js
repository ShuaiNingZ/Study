const http = require('http');
const url = require('url');

const server = http.createServer();

server.on('request', (req, res) => {
    let {pathname, search} = url.parse(req.url);

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
    }
})

server.listen('8008', '127.0.0.1', () => {
    console.log(`服务启动, 访问 http://127.0.0.1:8008`);
})
