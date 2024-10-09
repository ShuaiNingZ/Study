const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const md5 = require('js-md5')

router.post('/', (req, res, next) => {
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
                if (user) {
                    return res.json({
                        status: 500,
                        data: '用户已存在'
                    })
                } else {
                    userData.push({
                        user_id: `${Math.random()}`,
                        account: account,
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
    }
})

module.exports = router;
