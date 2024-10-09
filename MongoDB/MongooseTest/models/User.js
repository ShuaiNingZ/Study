const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    user_name: String,
    password: {
        type: String,
        // 默认设置 查询 user 的 document 文档的时候, 不返回 password 字段
        select: false
    }
})

module.exports = mongoose.model('User', schema);
