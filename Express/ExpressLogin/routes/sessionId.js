const express = require('express');
const router = express.Router();

router.post('/', async function (req, res, next) {
    let {username, pwd} = req.body;
    req.session.sid = username;
    // console.log(username, pwd)
    // 登录验证账号密码正确之后, 设置 session 信息 sid
    // sid 加签名加密后, 服务端设置 cookie 到客户端
    res.send(200, {
        statusCode: 200,
        errMsg: 'welcome'
    })
})

module.exports = router;
