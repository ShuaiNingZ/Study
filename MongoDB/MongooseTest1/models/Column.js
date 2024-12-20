const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    // 分类名称
    name: {
        type: String,
        required: true
    },
    // 更新日期
    date: {
        type: Schema.Types.Date,
        default: Date.now
    },
    // 文章 id
    aid: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
})

module.exports = mongoose.model('Column', schema);

/**
 *  User
 *      ref: Null
 *
 *  Article
 *      ref: {
 *          comments => Comment
 *          column => Column
 *          author => User
 *      }
 *
 *  Comment
 *      ref: {
 *          uid => User
 *          aid => Article
 *      }
 *
 *  Column
 *      ref: {
 *          aids => Article
 *      }
 */
