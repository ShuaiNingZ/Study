/*
const path = require('path');
let math = require('./src/math');

console.log(path)

math.p();
// join、resolve
console.log(path.join(__dirname, 'views'));
console.log(path.resolve(__dirname, 'views'));
console.log(path.join(__dirname, 'views') === path.resolve(__dirname, 'views'));    // true

console.log(path.join('views', 'home', 'homePage'));    // views\home\homePage
console.log(path.resolve('views', 'home', 'homePage')); // node 命令行执行所在文件路径 + views\home\homePage
console.log(path.join('views', 'home', 'homePage') === path.resolve('views', 'home', 'homePage'));  // false

// relative
console.log(math.p());
console.log(__dirname);
console.log(`相对路径: ${path.relative(math.p(), __dirname)}`)

// parse
console.log(path.parse(__dirname));

// basename
console.log(path.basename(__dirname));

// delimiter
console.log(path.delimiter)

// format
console.log(path.format({
    root: 'C:\\',
    dir: 'C:\\Users\\zfy_g\\Desktop',
    base: 'nodeStydy',
    ext: '',
    name: 'nodeStydy'
}))

// isAbsolute
console.log(path.isAbsolute(__dirname));

// normalize
console.log(path.normalize('\\\\\\nodeStydy\\\\\\views\\\\\\home\\\\\\homePage')); // \nodeStydy\views\home\homePage

*/

/**
 * __dirname 从根目录出发, 当前文件所在文件夹的路径
 * __filename 当前文件的绝对路径
 * path.join() 路径拼接
 * path.resolve() 将相对路径转为绝对路径
 * path.relative() 返回两个文件之间的相对路径, 返回 参数2 相对于 参数1 的路径
 * path.parse() 返回一个对象
 *      root: 根目录,
 *      dir 不包含当前文件上级的文件路径,
 *      base 当前文件的上级目录,
 *      ext 文件拓展名,
 *      name 当前文件目录的上级目录名字
 * path.delimiter 返回路径分隔符
 * path.format 将对象变成路径
 * path.isAbsolute 是否是绝对路径
 * path.normalize 将多个 \ 路径转为一个 \, 注意: \ 是偶数个, 否则 \n 之类的会变成换行符
 */
const path = require("path");
console.log(path.basename(__filename));

/**
 * path 模块
 * 作用: 获取文件位置路径
 * __dirname: 当前文件所在的目录路径 (绝对路径)
 * __filename: 当前文件所在的目录路径 + 文件名称 (绝对路径)
 */

/**
 * path 模块
 * 作用: 获取文件位置路径
 * __dirname: 当前文件所在的目录路径 (绝对路径)
 * __filename: 当前文件所在的目录路径 + 文件名称 (绝对路径)
 */
const path = require("path");
/**
 * path.basename(path[, ext])
 * ext 可选的文件扩展名
 * 返回 path 的最后一部分
 */
console.log(path.basename("./path/path.js")); // path.js
console.log(path.basename("./path/path.js", ".js")); // path
/**
 * path.delimiter
 * 返回路径分隔符
 */
console.log(path.delimiter); // ;
/**
 * path.dirname(path)
 * 返回 path 的目录名
 */
console.log(path.dirname("./path/path.js")); // ./path
/**
 * path.extname(path)
 * 返回 path 的扩展名
 */
console.log(path.extname("./path/path.js")); // .js
console.log(path.extname("./path/path.js.html")); // .html
console.log(path.extname("./path/path.")); // .
console.log(path.extname(".js")); // ''
/**
 * path.isAbsolute(path)
 * path 是否为绝对路径, 返回布尔值
 */
console.log(path.isAbsolute("/path")); // true
console.log(path.isAbsolute("./path")); // false
console.log(path.isAbsolute("C:/path")); // true
console.log(path.isAbsolute("path")); // false
console.log(path.isAbsolute(".")); // false
/**
 * path.normalize(path)
 * 将多个 \ 路径转为一个 \, 注意: \ 是偶数个, 否则 \n 之类的会变成换行符
 */
console.log(
    path.normalize("\\\\\\nodeStudy\\\\\\views\\\\\\home\\\\\\homePage")
);
// \nodeStudy\views\home\homePage
/**
 * path.sep
 * 系统的路径片段分隔符
 * Windows 是 \
 * POSIX 是 /
 */
console.log("path\\path.js".split(path.sep));
// [ 'path', 'path.js' ]
/**
 * path.join([...paths])
 * ...paths 路径名
 * 返回完整路径
 */
console.log(
    path.join(
        "/pathDir",
        "pathModule",
        "path/path.js",
        "pathFile",
        "file.js",
        ".."
    )
);
// \pathDir\pathModule\path\path.js\pathFile   Windows 系统是 \, Unix 系统是 /
/**
 * path.resolve([...paths])
 * ...paths 路径名
 * 将相对路径转为绝对路径
 */
console.log(path.join("C:/", "views"));
// C:/views
console.log(path.resolve("C:/", "views"));
// C:/views
console.log(path.join("views", "home", "homePage"));
// views/home/homePage
console.log(path.resolve("views", "home", "homePage"));
// node 命令行执行所在文件的绝对路径 + views/home/homePage
console.log(path.resolve("./views", "home", "homepage"));
// node 命令行执行所在文件的绝对路径 + views/home/homePage
console.log(path.resolve("/views", "home", "homepage"));
// C:/views/home/homepage
/**
 * path.relative(from, to)
 * 根据当前工作目录, 返回 from 相对于 to 的相对路径
 */
console.log(path.relative("C:/path/src/pathModule/path.js", "C:/path.js"));
// ../../../../path.js
/**
 * path.format(pathObject)
 * 将对象变成路径
 * pathObject.dir 存在, 则忽略 pathObject.root
 * pathObject.root
 * pathObject.base 存在, 则忽略 pathObject.ext 和 pathObject.name
 * pathObject.name
 * pathObject.ext
 */
console.log(
    path.format({
        root: "/path",
        dir: "/pathModule",
        base: "path.js",
    })
);
// /pathModule\path.js
/**
 * path.parse(path)
 * 将路径转为对象
 * 返回一个对象
 *      root: 根目录,
 *      dir 不包含当前文件上级的文件路径,
 *      base 当前文件的上级目录,
 *      ext 文件拓展名,
 *      name 当前文件目录的上级目录名字
 */
console.log(path.parse("./path/pathModule/pathDir/path.js"));
// { root: '', dir: './path/pathModule/pathDir', base: 'path.js', ext: '.js', name: 'path' }
console.log(path.parse("/path/pathModule/pathDir/path.js"));
// { root: '/', dir: '/path/pathModule/pathDir', base: 'path.js', ext: '.js', name: 'path' }
