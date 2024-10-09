const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.baseUrl);
    next();
})

router.get('/uid', (req, res, next) => {
    console.log(req.query);
    res.send(200, '欢迎')
})

// auth 认证登录
router.get('/auth', (req, res, next) => {
    res.send(200, {statusCode: 9981, msg: 'auth 认证登录成功'})
})

// sms 短信登录
router.get('/sms', (req, res, next) => {
    res.send(200, {statusCode: 9981, msg: 'sms 短信登录成功'})
})

// pwd 密码登录
router.get('/pwd', (req, res, next) => {
    res.send(200, {statusCode: 9981, msg: 'pwd 密码登录成功'})
})

module.exports = router
