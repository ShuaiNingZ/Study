const http = require('http')
const path = require('path');
const fs = require('fs');
;
const express = require('express');

const protocol = 'http';
const host = '127.0.0.1';
const port = 8008;
const app = express();
const server = http.createServer(app).listen(
    port,
    host,
    () => {
        console.log(`服务启动, 访问 ${protocol}://${host}:${port}`);
    }
)

app.set('views', path.join(__dirname, 'views')); // 设置模板 view 所在目录
app.set('view engine', 'hbs'); // 设置模板引擎类型 hbs

app.use(express.static(path.join(process.cwd(), '/public')))

const viewsPath = path.join(process.cwd(), './views')

app.use('/', (req, res, next) => {
    // res.send(200, {a: 'send'})
    // res.json(200, {a: 'json'})
    res.render('index', {
        title: 'Express hbs 模板渲染',
        msg: '你好 访问者',
        list: ["测试", "测试测试", "测测测"],
        orderList: [
            {
                name: '吸尘器',
                price: 123,
            },
            {
                name: '扫地机器人',
                price: 12223
            }
        ],
        obj: {
            name: "不秋草",
            age: 123,
            sex: true,

        }
    })
    /*res.sendFile(path.join(viewsPath, './index.html'), {
        maxAge: 20000 // 缓存时间 ms
    }) // 无法插入变量动态修改*/
})

/**
 * res.render(模板名称, {模板数据对象}, 渲染回调函数)
 * 通过模板名称, 结合 view engine 属性值 识别模板文件类型
 * index.hbs 文件路径 查询 views 属性获取 index.hbs 所在目录
 * 读取 index.hbs 模板内容
 * HTMLStr = hbs.template(模板内容, 模板数据对象)
 * res.send(200, htmlStr)
 * 如果存在 layout.hbs, 渲染是会吧其他页面嵌套在 layout.hbs 的
 * body 变量渲染
 */















