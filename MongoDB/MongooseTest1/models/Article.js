const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    // 标题
    title: {
        type: String,
        required: true,
        default: '默认标题' + Date.now
    },
    // 封面
    cover: {
        // URL
        type: String,
    },
    // 文章内容
    body: {
        // URIencode(HTMLCode)
        type: String,
        required: true
    },
    // 更新日期
    date: {
        type: Schema.Types.Date,
        default: Date.now
    },
    // 点击量
    hits_num: {
        type: Number,
        default: 0
    },
    // 评论数量
    comment_num: {
        type: Number,
        default: 0
    },
    // 喜欢 点赞
    likes_num: {
        type: Number,
        default: 0
    },
    // 作者
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // 评论集合
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    // 分类
    column: {
        type: Schema.Types.ObjectId,
        ref: 'Column',
        default: '技术文章'
    }
})

module.exports = mongoose.model('Article', schema);
