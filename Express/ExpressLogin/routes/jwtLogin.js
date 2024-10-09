const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {vertifyPwd} = require("../core/rsa-user");

/**
 * 验证 token
 *     如果 token 存在并且有效
 *     直接(前端或后端)重定向到 首页 /index 或 /user
 *     后端重定向使用 res.redirect()
 * token 不正确
 *     返回错误码
 *        前端做法:
 *          跳转到登录页面
 *          用户填入账号密码
 *          重新请求 getToken 接口
 */

router.post('/', async function (req, res, next) {
    let {username, pwd} = req.body;
    console.log(username, pwd);
    if (
        !username
        || username.length === 0
        || !pwd
        || pwd.length === 0
    ) {
        res.json(200, {
            statusCode: '4012',
            errMsg: '账号或密码错误'
        })
    }
    let password = await vertifyPwd(pwd)
    let privateKey = fs.readFileSync(path.join(process.cwd(), './auth/private.cer'), 'utf8');
    let token = jwt.sign(
        {
            username,
            // 设置过期时间
            exp: ~~(((Date.now() + 10 * 1000) / 1000))
        },
        privateKey,
        {
            algorithm: 'RS256'
        }
    );
    console.log(token)
    res.json(200, {
        statusCode: '200',
        errMsg: 'ok',
        data: {
            token
        }
    })
})

module.exports = router;
