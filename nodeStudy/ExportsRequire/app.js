// const objA = require('./modules/modulesA');

// console.log(objA);

const main = {
    name: 'app.js',
    path: 'Z:\\Study\\nodeStudy\\NodeModules\\',
    version: '0.0.1'
}

/**
 * require.main 当前 node 程序入口模块的 module 对象
 * module 当前模块(文件)的模块对象
 * __filename 当前模块(文件) 的文件名 等同于 module.filename
 */

// console.log(require.main)
// console.log(require.main === module);
// true 表示改文件为 node 程序的主入口模块
// 如果 require.main 和 module 相等 就说明这个文件在当前 node 程序中为主入口文件

// const foo = require('./modules/foo')
// let agent = foo.add();
// let result = agent();
// console.log(result)
/**
 * 加载目录顺序
 * 如果传递给 require() 的模块标识符不是一个核心模块,
 * 也没有以 '/'、'../' 或 './' 开头, 则 Node.js 会从当前模块的父目录开始,
 * 尝试从它的 /node_module 目录里加载模块, Node.js 不会附加 node_modules
 * 到一个已经以 node_modules 结尾的路径上
 * 如果还是没有找到, 则移动到再上一层父目录, 知道文件系统的根目录
 * require 导入自定义模块名称如果与原生 node 内置模块冲突, 优先使用 node 内置模块
 *
 * require('./foo')
 *  1. 相对目录下的 foo.js
 *  2. 相对目录下的 foo 文件夹里找 package.json 里面的 main 属性的值对应的文件作为模块问文件
 *  3. 相对目录下的 foo 文件夹里的 index.js
 */

// const foo = require('./foo');
// console.log(foo);

// const foo = require('./foo')
// const fww = require('./fww')
// const fxx = require('./fxx')
//
// console.log(fww);

// console.log(
//     `当前文件所属夹路径: ${__dirname}`,
//     `当前文件路径: ${__filename}`
// )

console.dir(require.resolve(__dirname) === __filename)
console.dir(require.resolve.paths('nodemon'))


