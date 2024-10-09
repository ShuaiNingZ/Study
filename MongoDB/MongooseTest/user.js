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

/**
 * schema 字段值:
 *      type: 字段类型 String Number Date Buffer Boolean Mixed ObjectId Array Decimal128
 *      required: 布尔值或函数, 如果值为真, 为此属性添加 required 验证器
 *      default: 任何职或函数, 设置此路径默认值. 如果是函数, 函数返回值为默认值
 *      select: 布尔值, 指定 query 的默认 projections
 *      validate: 函数, adds a validator function for this property
 *      get: 函数, 使用 Object.defineProperty() 定义自定义 getter
 *      set: 函数, 使用 Object.defineProperty() 定义自定义 setter
 *      alias: 字符串, 仅 mongoose >= 4.10.0. 为该字段路径定义虚拟值 gets/sets
 *      lowercase: 所有值都转换小写, 只能用于 type 是 String 的字段
 */
// 集合模式 options schema
let userSchema = mongoose.Schema({
    "user_id": Number,
    "user_name": String
})
// 实例化 集合 collection model
let User = mongoose.model('user', userSchema);
// 集合实例化创建文档 document Document
let user = new User({
    user_id: Number((Math.random() * 10).toFixed(8)),
    user_name: '子非鱼、'
})

/*// 存储数据 操作数据库进行 insertOne
user.save()
    .then((user) => {
        console.log('保存成功', user)
    })
    .catch(err => {
        console.error('保存失败', err)
    })*/

/*// 删除文档 由集合删
User.deleteOne({user_name: '子非鱼、'})
    .then((user) => {
        console.log('删除成功', user)
    })
    .catch(err => {
        console.error('删除失败', err)
    })*/

// 集合.查询文档
User.findOne({user_name: /秋/})
    .then((user) => {
        console.log('查询成功', user)
    })
    .catch(err => {
        console.error('查询失败', err)
    })

