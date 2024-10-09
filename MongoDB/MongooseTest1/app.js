var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {mongoose} = require('./plugins/db');
const resourceMiddleware = require('./middleware/resource')
const {busRoute} = require('./routes/bus');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors({
    "origin": true, // true 设置为 req.origin.url
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // 容许跨域请求的方式
    "allowedHeaders": "x-requested-with,Authorization,token,content-type,Cookies", // 跨域请求头
    "preflightContinue": false, // 是否通过 next() 传递 options 请求 给后续中间件
    "maxAge": 1728000, // options 预验结果缓存时间 20 天
    "credentials": true, // 携带 cookie 跨域
    "optionsSuccessStatus": 200, // options 请求返回状态码
}));
app.use(express.json());
app.use(express.urlencoded());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/rest/:resource', resourceMiddleware(), busRoute);

/*app.use('/', indexRouter);
app.use('/users', usersRouter);*/

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
