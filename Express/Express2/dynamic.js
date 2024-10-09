const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

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

const storage = multer.diskStorage({
    destination(req, file, cb) {
        // req 中间件处理 请求时
        // file 上传的文件
        // cb 参数 this 指向, 存放文件的位置

        let userUid = req.params['uid'];
        let uploadPath = req.params['upath'];
        let uidPath = path.join(__dirname, `./uploads/uid${userUid}`);
        console.log(userUid, uploadPath, uidPath);
        fs.existsSync(uidPath) || fs.mkdirSync(uidPath);
        uidPath = path.join(uidPath, `./${uploadPath}`);
        fs.existsSync(uidPath) || fs.mkdirSync(uidPath);

        cb(null, uidPath);
    },
    filename(req, file, cb) {
        // req 请求, 中间件带过来的 request 对象
        // file 上传的问题进啊对象
        // cb 参数 this 指向, 文件存储名
        let {ext, name} = path.parse(file.originalname);
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
});
const upload = multer({storage});
// /user/4040/setname?name=秋、
app.use('/user/:uid/setname', (req, res, next) => {
    let uid = req.params['uid'];
    let setname = req.query['name'];
    fs.readFile('./userData/user.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log(data)
        let userArr = JSON.parse(data);
        const userIdx = userArr.findIndex(item => item['user_uid'] === uid);
        if (~userIdx) {
            userArr[userIdx]['user_name'] = setname
        }
        let userStr = JSON.stringify(userArr);
        fs.writeFile(
            './userData/user.json',
            userStr,
            {
                flag: 'w+'
            },
            () => {
                console.log(`UID: ${uid} 用户的 name 设置为 ${setname}`)
                next();
            }
        );
    })
    res.send('ok')
})

// /user/4040/upload/avatar
// uploads/uid4040?/avatar/xxx.png
// uid4040 not Found mkdir uid4040
// uid4040 > avatar not Found mkdir avatar
// multer 中间件会给 req 对象挂 3 个属性 body file files
app.use('/user/:uid/upload/:upath', upload.single('file'), (req, res, next) => {
    console.log(req.file);
    res.send(`${req.file.filename} 文件上传成功`)
})






















