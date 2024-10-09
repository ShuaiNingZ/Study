const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const myMiddle = require('./middleware/1')
const loginHtmlRouter = require('./routes/loginHtml');
const homeRouter = require('./routes/home');

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const verifyTokenRouter = require('./routes/verifyToken');
const fs = require("fs");
const path = require("path");

const protocol = 'http';
const host = '127.0.0.1';
const port = 9000;
const app = express();

const server = app.listen(
    port,
    host,
    () => {
        console.log(`服务启动, 访问 ${protocol}://${host}:${port}`);
    }
)

app.set('view engine', 'hbs');

app.use(cors({
    "origin": true, // true 设置为 req.origin.url
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // 容许跨域请求的方式
    "allowedHeaders": "x-requested-with,Authorization,token,content-type,Cookies", // 跨域请求头
    "preflightContinue": false, // 是否通过 next() 传递 options 请求 给后续中间件
    "maxAge": 1728000, // options 预验结果缓存时间 20 天
    "credentials": true, // 携带 cookie 跨域
    "optionsSuccessStatus": 200, // options 请求返回状态码
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
})

app.use(myMiddle({}))

// 页面
app.use('/home', homeRouter);
app.use('/loginHtml', loginHtmlRouter);

// 接口
// 无需 token 接口
app.use('/login', loginRouter)

app.use('/register', registerRouter)

app.get('/cookie', (req, res) => {
    console.log('Cookies', req.cookies)
    console.log('Signed Cookies: ', req.signedCookies)
    res.send('')
})

// 需要 token 接口
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({
            data: {
                status: 403,
                msg: '没有 token'
            }
        })
    }

    jwt.verify(
        token,
        fs.readFileSync(path.join(process.cwd(), '/auth/public.cer'), 'utf8'),
        (err, decoded) => {
            if (err) {
                return res.send({
                    data: {
                        status: 401,
                        msg: 'token 失效'
                    }
                })
            }
            console.log(decoded)
            res.userId = decoded.userId;
            next();
        }
    )
});

app.use('/verifyToken', verifyTokenRouter);

/*app.get('/', (req, res) => {
    res.send(`root${req.requestTime}`);
})

app.use('/g', (req, res, next) => {
    req.myMiddleMsg = '哈哈哈'
    next()
})

app.get('/g', (req, res) => {
    res.send(`root${req.requestTime}${req.myMiddleMsg}`);
})*/
/*
app.get('/about', (req, res) => {
    res.send('about');
})

app.get('/random.text', (req, res) => {
    res.send('random.text');
})

app.get('/ab?cd', (req, res) => {
    res.send('abcd 或 acd');
})

app.get('/ab+cd', (req, res) => {
    res.send('abbbcd, abbbbbbbcd...');
})

app.get('/ab*cd', (req, res) => {
    res.send('ab任意字符cd');
})

app.get('/ab(cd)?e', (req, res) => {
    res.send('abe 或 abcde');
})

app.get(/a/, (req, res) => {
    res.send('匹配任意带 a 的路由')
})

app.get(/.*fly$/, (req, res) => {
    res.send('以 fly 结尾')
})

app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
})

// - 用法
app.get('/flights/:form-:to', (req, res) => {
    res.send(req.params)
})

// . 用法
app.get('/plnte/:genus.:species', (req, res) => {
    res.send(req.params)
})
*/

express.static(__dirname)

app.use(express.static('public'))
