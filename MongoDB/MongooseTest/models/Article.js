const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    title: String,
    author: {
        type: String
    }
})

module.exports = mongoose.model('Article', schema);
