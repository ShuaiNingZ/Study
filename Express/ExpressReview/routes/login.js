const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const md5 = require('js-md5')
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    console.log(req.body)
    let {account, password} = req.body;

    // 校验账号密码是否存在
    if (!account || !password) {
        return res.json({
            status: 500,
            data: '账号或密码为空'
        })
    }

    if (account && password) {
        fs.readFile(
            path.join(__dirname, '../user/user.json'),
            {
                encoding: 'utf8'
            },
            (err, data) => {
                if (err) throw err;
                // 查询数据库不存在
                const userData = JSON.parse(data);
                const user = userData.find(item => item.account === account);
                console.log(user)
                if (!user) {
                    return res.json({
                        status: 500,
                        data: '账号没有注册请先注册'
                    })
                } else {
                    console.log(user.password, md5(password + '123123123'))
                    if (user.password !== md5(password + '123123123')) {
                        return res.json({
                            status: 500,
                            data: '密码不正确'
                        })
                    } else {
                        const token = jwt.sign(
                            {
                                userId: user.user_id,
                                exp: Math.floor(Date.now() / 1000) + 30
                            },
                            fs.readFileSync(path.join(process.cwd(), '/auth/private.cer'), 'utf8'),
                            {
                                algorithm: 'RS256'
                            }
                        );
                        console.log(token)
                        res.json({
                            status: 200,
                            data: {
                                msg: '用户登录成功',
                                token
                            }
                        })
                    }
                }
            }
        )
    }
})

module.exports = router;
