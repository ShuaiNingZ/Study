const mongoose = require('mongoose');
const md5 = require('js-md5')

/**
 * username:
 * 用户名
 * type: String
 * validate: 数字 + 字母 6-8 位 /^(?!\d+$)(?![a-zA-z]+$)[a-zA-Z0-9]{6,8}$/
 * required true 必填
 * unique true 唯一
 *
 * password
 * 密码
 * type: String
 * select false 不可查询
 * set: encrypt(value) RSA 加密
 * required true 必填
 * validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/
 *
 * email
 * 邮箱
 * type: String
 * required: false
 * unique: true
 * validate: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
 *
 * avatar
 * 头像
 * required: false
 * type: String (URL)
 * default: 'http://127.0.0.1:3000/public/images/avatar.jpg'
 *
 * nickname
 * 昵称
 * type: String
 * required: false
 * validate: /^([\w\W]){1,8}$/
 * default: '用户1'
 */

let schema = mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: function (val) {
                // return /^(?!\d+$)(?!、[a-zA-z]+$)[a-zA-Z0-9]{2,8}$/.test(val)
                return /.{2,8}$/.test(val)
            },
            message: '用户名必须为 数字+字母 2-8 位'
        },
        required: [true, '用户名必填'],
        unique: true,
        index: true
    },
    password: {
        type: String,
        select: false,
        required: true,
        set(val) {
            // 触发器 setter 写入 password 时 触发 写入数据 => encrypt(源数据)
            return md5(val)
        }
    },
    email: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val)
            },
            message: '请输入合法邮箱地址'
        },
        unique: true,
        required: true,
    },
    avatar: {
        type: String,
        default: 'http://127.0.0.1:3000/public/images/avatar.jpg'
    },
    nickname: {
        type: String,
        default: '用户1',
        validate: {
            validator: function (val) {
                return /^[0-9a-zA-Z\u0391-\uFFE5]{1,8}$/.test(val)
            },
            message: '昵称可包含 数字/英文/汉字 1-8位'
        },
        required: true,
    }
})

module.exports = mongoose.model('User', schema);

