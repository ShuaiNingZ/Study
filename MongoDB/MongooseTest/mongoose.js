const mongoose = require('mongoose');
const {Schema, model, SchemaTypes, Types} = mongoose;
mongoose.connect('mongodb://127.0.0.1:27017/blog');
let db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
})

db.on('open', () => {
    console.log('数据库已连接')
})

// 集合关联 populate

// User
let userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    articles: [
        {
            type: SchemaTypes.ObjectId,
            // ref 关联 集合 model 的名称
            ref: 'Article'
        }
    ]
})

// Article
let articleSchema = new Schema({
    title: {
        type: String,
        // 是否必填
        unique: true,
        default: '默认文章标题' + Date.now(),
        // validate: {
        //     required: true
        // }
    },
    body: {
        type: String
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    }
})

/**
 * 登录一个用户
 * 获取用户文章列表 () => 文章 document 必须有字段存储用户 id
 * 获取文章 => 标题 内容 发表时间 点赞数量 查看数量 评论数量 uid (用户名 用户签名 用户头像 ...) (评论列表)
 *
 */

let User = model('User', userSchema);

let Article = model('Article', articleSchema);

/**
 * 生成
 * mongoose.SechemaTypes.ObjectId() => 生成一个 ObjectId
 * 转换
 * String => ObjectId
 *      mongoose.Types.ObjectId(StringId)
 * ObjectId => String
 *      id.toString()
 */

let uid = new Types.ObjectId('660384bb1b775823c0db85f6');
// console.log(uid instanceof SchemaTypes.ObjectId);
/*
// 文章查作者
Article.findOne({
           title: '测试文章1'
       })
       .populate('author', 'username')
       .then(doc => {
           console.log(doc)
           /!*User.findById(doc.author).then(user => {
               console.log(user)
           })*!/

       })
       .catch(err => {
           console.log(err.errors)
       })
*/

// 作者查文章
User.findOne({username: 'zhangsan'}).populate('articles', ['title', 'body']).then(data => {
    console.log(data)
})

/*Article.create({
    title: '测试文章2',
    body: '秋秋秋秋秋秋秋秋秋秋秋秋',
    author: uid
}).then(doc => {
    console.log(doc)
    User.findByIdAndUpdate(uid, {$push: {articles: doc._id}}).then(data => {
        console.log(data)
    })
}).catch(err => {
    console.log(err.errors)
})*/

/*User.create({
    username: 'zhangsan',
    password: '123123',
    articles: []
}).then(doc => {
    console.log(doc)
}).catch(err => {
    console.log(err.errors)
})*/
