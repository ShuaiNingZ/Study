const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_blog');

let db = mongoose.connection;

db.on('error', (err) => {
    console.log(err)
})

db.on('open', () => {
    console.log('mongodb://localhost:27017/db_blog is open')
})

module.exports = {
    mongoose
}
