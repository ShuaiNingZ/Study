const express = require('express');
const assert = require('http-assert');
const md5 = require('js-md5')
const User = require('../models/User');
const { generateToken } = require('../middleware/auth')

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let { username, password } = req.body;

        // 账号或密码不能为空
        assert(username || password || password !== md5(''), 200, {
            code: 500,
            data: {
                msg: '账号或密码不能为空'
            }
        })

        // 账号密码都存在
        const user = await User
            .findOne({
                username: username
            })
            .select('+password');
        // 账号没有查到
        assert(user, 200, {
            code: 500,
            data: {
                msg: '账号没有注册请先注册'
            }
        })
        // 账号存在, 密码不正确
        assert.equal(user.password, md5(password), 200, {
            code: 500,
            data: {
                msg: '账号或密码不正确'
            }
        })
        // 账号密码正确
        const token = generateToken({
            username: user.username,
            userId: user._id.toString()
        })
        res.send(200, {
            code: 200,
            data: {
                msg: '用户登录成功',
                userId: user._id.toString(),
                token
            }
        })
        /*if (!user) {
            return res.json({
                status: 500,
                data: '账号没有注册请先注册'
            })
        }
        else {
            // md5(password + '123123123')
            if (user.password !== password) {
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
        }*/
        /*fs.readFile(
            path.join(__dirname, '../user/user.json'),
            {
                encoding: 'utf8'
            },
            (err, data) => {
                if (err) throw err;
                // 查询数据库不存在
                const userData = JSON.parse(data);
                const user = userData.find(item => item.username === username);
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
        )*/
    } catch (err) {
        next(err)
    }
})

module.exports = router;
