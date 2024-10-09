const mongoose = require('mongoose');
// 连接数据库 协议://host:port/数据库名字
mongoose.connect('mongodb://127.0.0.1:27017/db_blog');
// 获取连接控制
let db = mongoose.connection;
// 监听连接时发生的事件
db.on('error', (err) => {
    console.log(err)
})

db.on('open', () => {
    console.log('数据库已连接')
})

// 集合模式 options schema
let bookSchema = mongoose.Schema({
    bid: {
        type: String,
        // 单个索引
        index: true
    },
    name: String,
    author: String,
    des: String,
    price: Number
})
// 符合索引
bookSchema.index({bid: 1, name: 1})

let book = mongoose.model('book', bookSchema);

book.create([
    {
        bid: '000123',
        name: '书1',
        author: 'zhangsan',
        des: '书本1',
        price: 19.9
    },
    {
        bid: '000124',
        name: '书2',
        author: 'zhangsan2',
        des: '书本2',
        price: 29.9
    },
    {
        bid: '000125',
        name: '书3',
        author: 'zhangsan3',
        des: '书本3',
        price: 39.9
    },
]).then(data => {

}).catch(err => {

})
