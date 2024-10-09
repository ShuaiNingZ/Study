var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// session 中间件
const session = require('express-session')
const {expressjwt} = require('express-jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionLoginRouter = require('./routes/sessionLogin');
var getPubKeyRouter = require('./routes/getPublicKey');
var sessionIdRouter = require('./routes/sessionId');
var useSessionIdRouter = require('./routes/useSessionId');
var jwtLoginRouter = require('./routes/jwtLogin');
var useJwtRouter = require('./routes/useJwt');
const fs = require("fs");

var app = express();

app.use(cors({
    "origin": true, // true 设置为 req.origin.url
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // 容许跨域请求的方式
    "allowedHeaders": "x-requested-with,Authorization,token,content-type,Cookies", // 跨域请求头
    "preflightContinue": false, // 是否通过 next() 传递 options 请求 给后续中间件
    "maxAge": 1728000, // options 预验结果缓存时间 20 天
    "credentials": true, // 携带 cookie 跨域
    "optionsSuccessStatus": 200, // options 请求返回状态码
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// http://127.0.0.1:3000/html/sessionId.html 这样访问
app.use(express.static(path.join(__dirname, 'public')));
// http://127.0.0.1:3000/sessionId.html 这样访问
app.use(express.static(path.join(__dirname, './public/html')));

// 设置 cookie 时, 请确保服务 host 与 客户端 host 一致, 避免 域名 和 IP 两种方式访问
app.use(session({
    secret: 'sessionKey', // 签名 字符串
    resave: true, // 强制保存 session 即使没有变化
    saveUninitialized: true, // 强制将未初始化的 session 存储 默认值 true
    name: 'sid', // 设置 cookie 的 key
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessionLogin', sessionLoginRouter);
app.use('/getPublicKey', getPubKeyRouter);
app.use('/sessionId', sessionIdRouter);
app.use('/useSessionId', useSessionIdRouter);
app.use('/jwtLogin', jwtLoginRouter);

let publicKey = fs.readFileSync(path.join(process.cwd(), './auth/public.cer'), 'utf8');

app.use(expressjwt({
    secret: publicKey,
    algorithms: ["RS256"],
    credentialsRequired: false,
    /*getToken: function fromHeaderOrQuerystring(req) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },*/
    isRevoked(req, payload) {
        // token 解析完成之后, 回调 token 内容
        console.log('payload', payload)
        const {username, iat} = payload.payload;
        // let nbf = Date.now() - (3600 * 24 * 3 * 1000);
        // let nbf = Date.now() - (60 * 1000);
        req.tokenID = username;
        // console.log(iat * 1000, nbf, iat * 1000 > nbf)
        // return iat * 1000 < nbf;
    }
}))
app.use('/useJwt', useJwtRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
