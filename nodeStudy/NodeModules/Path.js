const path = require('path');

// const Name = path.basename(__filename);
// console.log(Name);

// 分隔符
// console.log(process.env.PATH.split(path.delimiter))

// 文件所在文件夹名称
// const DirName = path.dirname(__filename)
// console.log(DirName)
// console.log(DirName === __dirname)

// 扩展名
// console.log(path.extname(__filename));

// path 解析路径
// console.log(path.parse(__filename))

// format 传递一个对象, 根据对象生成文件路径
// console.log(path.format(path.parse(__filename)))

// 判断绝对路径
// console.log(path.isAbsolute(__filename));

// 拼接路径
// let joinPath = path.join('../', 'bar', 'src');
// console.log(joinPath)

// 规范路径, 清除无效路径
console.log(path.normalize('/foo///bar//menu//..'));

// 相对路径
// console.log(path.relative(__filename, 'Event.js'))

// 当前系统环境下的默认路径符号
console.log(path.sep)

/**
 * path.delimiter 在 windows 环境下是 ; 在 posix 环境下是 :
 * path.sep 返回当前系统环境下的默认路径符号 windows \\ 或者 posix /
 * path.basename(__filename) 返回路径中最终的文件名称 + 后缀
 *      process.env.PATH 系统用户环境变量
 * path.dirname(__filename) 获取文件所在文件夹名称
 * path.extname(__filename) 获取路径中文件的后缀名称(扩展名)
 * path.parse(__filename) 解析路径成以下对象:
 *      {
 *        root: 根目录,
 *        dir: 文件所在绝对路径直到文件夹,
 *        base: 文件名 + 后缀,
 *        ext: 后缀,
 *        name: 文件名
 *      }
 * path.format(path.parse(__filename)) 传递一个对象, 根据对象生成对应的 path
 * path.isAbsolute(__filename) 返回布尔值, 判断 传入的参数 是否是绝对路径
 * path.join(path, path1, path2) 根据提供的路径生成对应系统环境下的路径
 * path.normalize(path) 规范路径, 清除路径中无效目录, 无效内容
 * path.relative(__filename, 'Event.js')、path.relative([...paths])
 *      将路径或路径片段序列解析为绝对路径
 */

