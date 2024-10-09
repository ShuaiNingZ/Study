const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const protocol = 'http';
const host = '127.0.0.1';
const port = 8008;
const app = express();
const server = http.createServer(app).listen(
    port,
    host,
    () => {
        console.log(`服务启动, 访问 ${protocol}://${host}:${port}`);
    }
)

app.use('/', (req, res, next) => {
    /*fs.readFile('/', (err, data) => {
        if (err) {
            throw err;
        }
        if (data) {
            console.log(data)
        }
    })*/
    console.log(req.params);
    res.send(200, 'success')
})
