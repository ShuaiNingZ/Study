const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    /* res.writeHead(200, {
        "Content-type": "text/plain",
    });
    res.write("你好, 这是我们自己得服务器给我们返回的第一个数据");
    res.end(); */
    if (req.url === "/") {
        fs.readFile(`${__dirname}/server.html`, function (err, data) {
            if (err) {
                res.writeHead(404, {
                    "Content-type": "text/plain",
                });
                res.write("file is not exsits");
                res.end();
            } else {
                res.writeHead(200, {
                    "Content-type": "text/html",
                });
                res.write(data);
                res.end();
            }
        });
    } else {
        fs.readFile(
            `${__dirname}/img/ModuleLoopNesting.png`,
            function (err, data) {
                if (err) {
                    res.writeHead(404, {
                        "Content-type": "text/plain",
                    });
                    res.write("file is not exsits");
                    res.end();
                } else {
                    res.writeHead(200, {
                        "Content-type": "image/*",
                    });
                    res.write(data);
                    res.end();
                }
            }
        );
    }
}).listen(9000, "127.0.0.1");
