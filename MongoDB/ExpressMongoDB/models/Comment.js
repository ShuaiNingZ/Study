const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    // 内容
    content: {
        type: String,
        required: true
    },
    // 更新日期
    date: {
        type: Schema.Types.Date,
        default: Date.now
    },
    // 评论者 id
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // 文章 id
    aid: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
})

module.exports = mongoose.model('Comment', schema);
