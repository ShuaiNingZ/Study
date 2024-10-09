const fs = require('fs');   // 引入内置模块 fs
const mod = require('./modules/index')

console.log(mod)
// fs.readFile('./Raindrop.html', 'utf-8', function (err, data) {
//     console.log(err)
//     console.log(data)
// })


/**
 * 文件就是模块, 模块就是文件
 *
 * 1. 导入模块 require(文件路径)
 * 2. 模块声明 每个 js 文件都是模块
 * 3. 模块如何导出暴露项目 exports
 */