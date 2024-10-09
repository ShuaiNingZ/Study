const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const assert = require('http-assert');
const createError = require('http-errors');
const md5 = require('js-md5')
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const QUE_MAP = require('../plugins/QUE_MAP.js')

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
        assert(!user, 200, {
            code: 500,
            data: {
                msg: '用户已存在, 请直接登录'
            }
        })
        const newUser = await User.create(req.body);
        console.log(newUser)

        res.send(200, {
            code: 200,
            data: {
                msg: '用户注册成功, 请登录'
            }
        })
    } catch (err) {
        // unique 为一项 出错判断
        if (err.message.indexOf('duplicate key error') !== -1) {
            let repeatKey = Object.entries(err.keyPattern)?.map(([key, value]) => {
                return `${ QUE_MAP?.[key] }不能重复`
            })[0]
            next(createError(200, {
                code: 500,
                data: {
                    msg: repeatKey
                }
            }))
        }
        // required validate err.errors
        if (err.errors) {
            let paramErrors = Object.entries(err.errors).map(([key, val]) => {
                console.log(`error: ${ key }, ${ val.message }`)
                return `${ val.message }`
            }).reduce((a, c) => {
                a += c;
                return a
            }, '')
            next(createError(200, {
                code: 500,
                data: {
                    msg: paramErrors
                }
            }))
        }
    }

    /*if (username && password) {
        fs.readFile(
            path.join(__dirname, '../user/user.json'),
            {
                encoding: 'utf8'
            },
            (err, data) => {
                if (err) throw err;
                // 查询数据库不存在
                const userData = JSON.parse(data);
                const user = userData.find(item => item.username === username);
                if (user) {
                    return res.json({
                        status: 500,
                        data: '用户已存在'
                    })
                } else {
                    userData.push({
                        user_id: `${Math.random()}`,
                        username: username,
                        password: md5(password + '123123123')
                    })
                    console.log(userData)
                    fs.writeFile(
                        path.join(__dirname, '../user/user.json'),
                        JSON.stringify(userData),
                        {
                            flag: 'w+'
                        },
                        (err) => {
                            if (err) return err;
                            return res.json({
                                status: 200,
                                data: '用户添加成功'
                            })
                        }
                    )
                }
            }
        )
    }*/
})

module.exports = router;
