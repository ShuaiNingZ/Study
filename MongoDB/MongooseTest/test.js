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
 * schema 常规参数字段值:
 *      type: 字段类型 String Number Date Buffer Boolean Mixed ObjectId Array Decimal128
 *      required: 布尔值或函数, 如果值为真, 为此属性添加 required 验证器
 *      default: 任何职或函数, 设置此路径默认值. 如果是函数, 函数返回值为默认值
 *      select: 布尔值, 指定 query 的默认 projections
 *      validate: 函数, adds a validator function for this property
 *      get: 函数, 使用 Object.defineProperty() 定义自定义 getter
 *      set: 函数, 使用 Object.defineProperty() 定义自定义 setter
 *      alias: 字符串, 仅 mongoose >= 4.10.0. 为该字段路径定义虚拟值 gets/sets
 *      lowercase: 所有值都转换小写, 只能用于 type 是 String 的字段
 * 索引参数
 *      index: 布尔值, 是否对这个属性创建索引
 *      unique: 布尔值, 是否对这个属性创建唯一索引
 *      sparse: 布尔值, 是否对这个属性创建稀疏索引
 *    string
 *      lowercase: 布尔值, 是否在保存前对此值调用 .toLowerCase()
 *      uppercase: 布尔值, 是否在保存前对别值调用 .toUpperCase()
 *      trim: 布尔值, 食肉在保存前对此值调用 .trim()
 *      match: 正则表达式, 创建验证器减产这个值是否匹配给定正则表达式
 *      enum: 数组, 创建验证器检查这个值是否包含于给定数组
 *    number
 *      min: 数值, 创建验证器检查属性是否大于或等于该值
 *      max: 数值, 创建验证器检验属性是否小于或等于该值
 */
    // 集合模式 options schema
let testSchema = new mongoose.Schema({
        "test_id": {
            type: String,
            index: true, // 创建索引
            unique: true // 唯一索引
        },
        "test_des": String
    })
// 实例化 集合 collection model
let Test = mongoose.model('test', testSchema);
// 集合实例化创建文档 document Document
/*// 增
// 创建一条 文档 document 实例化 model
let test = new Test({
    test_id: Number((Math.random() * 10).toFixed(8)),
    test_des: '子非鱼、'
})
// 存储
test.save()
    .then((user) => {
        console.log('保存成功', user)
    })
    .catch(err => {
        console.error('保存失败', err)
    })*/

/*
for (let i = 0; i < 30; i++) {
    let test = new Test({
        test_id: Number((Math.random() * 10).toFixed(5)),
        test_des: `秋、${i+1}`
    })
    // 存储
    test.save()
        .then((user) => {
            console.log('保存成功', user)
        })
        .catch(err => {
            console.error('保存失败', err)
        })
}
*/

/*Test.countDocuments().then(res => {
    console.log(res)
})*/

/*// 增量 increment 对其版本自增
Test.findOne({'test_id': {$lt: 5}}).then(data => {
    data.increment()
    data.save()
    console.log(data)
})*/

/*Test.where('test_id').gte(4).lte(1).then((res) => {
    console.log(res)
})*/

// 查找后删除
async function findAndDelete(model, query) {
    try {
        let result = await model.find(query);
        if (result) {
            await model.deleteOne(query);
            return '查询删除成功'
        }
    } catch (err) {
        console.log(err)
    }
}

/* 删
findAndDelete(Test, {test_des: '子非鱼、'}).then(res => {
    console.log(res)
    Test.find({}).then(res => {
        console.log(res)
    })
})
*/

/*Test.find()
    .then((user) => {
        console.log('查询成功', user)
    })
    .catch(err => {
        console.error('查询失败', err)
    })*/

/*// 删除文档 由集合删
User.deleteOne({user_name: '子非鱼、'})
    .then((user) => {
        console.log('删除成功', user)
    })
    .catch(err => {
        console.error('删除失败', err)
    })*/

/*// 集合.查询文档
User.findOne({user_name: /秋/})
    .then((user) => {
        console.log('查询成功', user)
    })
    .catch(err => {
        console.error('查询失败', err)
    })*/

