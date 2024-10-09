const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer((req, res) => {
    let path = url.parse(req.url);
    // console.log(path)
    let pathname = path.pathname;
    // let params = parseQuery(path.query);

    // JSONP 测试
    if (pathname === "/data") {
        fs.readFile(`${__dirname}/data.json`, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    "Content-type": "text/plain"
                });
                res.write("file is not exits");
                res.end();
            } else {
                // console.log(req.headers.origin)
                // 对任何人都开放
                res.writeHead(200, {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                });
                // let script = `${params.func}(${data})`;
                // 对指定端口开放
                /* if (req.headers.origin === "http://localhost:63342") {
                    res.writeHead(200, {
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    });
                } */
                res.write(script);
                res.end();
            }
        });
    }

    // 跨域测试 Access-Control-Allow-Origin
    // switch (req.url) {
    //     case "/":
    //         fs.readFile(`${__dirname}/index.html`, (err, data) => {
    //             if (err) {
    //                 res.writeHead(404, {
    //                     "Content-type": "text/plain",
    //                 });
    //                 res.write("file is not exits");
    //                 res.end();
    //             } else {
    //                 res.writeHead(200, {
    //                     "Content-type": "text/html",
    //                     // 'Access-Control-Allow-Origin': '*'
    //                 });
    //                 res.write(data);
    //                 res.end();
    //             }
    //         });
    //         break;
    //     case "/data":
    //         fs.readFile(`${__dirname}/data.json`, (err, data) => {
    //             if (err) {
    //                 res.writeHead(404, {
    //                     "Content-type": "text/plain",
    //                 });
    //                 res.write("file is not exits");
    //                 res.end();
    //             } else {
    //                 // console.log(req.headers.origin)
    //                 // 对任何人都开放
    //                 res.writeHead(200, {
    //                     "Content-type": "application/json",
    //                     "Access-Control-Allow-Origin": "*",
    //                 });
    //                 // 对指定端口开放
    //                 /* if(req.headers.origin === 'http://localhost:63342'){
    //                     res.writeHead(200, {
    //                         'Content-type': 'application/json',
    //                         'Access-Control-Allow-Origin': '*'
    //                     })
    //                 } */
    //                 res.write(data);
    //                 res.end();
    //             }
    //         });
    //         break;
    //     default:
    //         res.writeHead(404, {
    //             "Content-type": "text/plain",
    //         });
    //         res.write("file is not exits");
    //         res.end();
    //         break;
    // }
}).listen(3000, "127.0.0.8", () => {
    console.log("服务器启动成功，可以通过 http://127.0.0.8:3000/ 来进行访问");
});

function parseQuery(queryString) {
    let obj = {};
    let queryArr = queryString.split("&");
    for (let key in queryArr) {
        let keyVal = queryArr[key].split("=");
        obj[keyVal[0]] = keyVal[1];
    }
    return obj;
}
