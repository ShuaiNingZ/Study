const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    content: {
        type: String,
        required: true
    },
    // 更新日期
    date: {
        type: Schema.Types.Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Key', schema);
