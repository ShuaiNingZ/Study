const mongoose = require("mongoose");
const md5 = require("md5");

mongoose.connect('mongodb://127.0.0.1:27017/blog');
let db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
})
db.on('open', () => {
    console.log('数据库已连接')
})

let userSchema = mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: function (val) {
                return /^(?!\d+$)(?![a-zA-z]+$)[a-zA-Z0-9\u0391-\uFFE5]{4,8}$/.test(val)
            },
            message: '用户名必须为 数字+字母 6-8 位'
        },
        required: [true, '用户名必填'],
        unique: true
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

let User = mongoose.model('user', userSchema);

User.create({
    username: '不秋草、',
    password: '123123',
    email: '9999@163.com',
    avatar: '',
    nickname: '秋、',
}).then(doc => {
    console.log(doc)
}).catch(err => {
    console.log(err)
    // unique 为一项 出错判断
    if (err.message.indexOf('duplicate key error') !== -1) {
        console.log('索引项重复:', err.keyPattern)
        return
    }
    // required validate err.errors
    Object.entries(err.errors).map(([key, val]) => {
        console.log(`error: ${key}, ${val.message}`)
    })
})
