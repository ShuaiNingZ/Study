/**
 * node 的核心概念之非阻塞 I/O
 * 访问磁盘和网络 I/O 请求会比较慢, 在读取文件或通过网络发送消息时, 不会阻塞业务逻辑的执行
 * Node 用三种技术解决这个问题: 事件、异步 API、非阻塞 I/O
 * 非阻塞 I/O 是底层术语, 意思: 程序在做其他事情时发起一个请求获取网络资源, 然后当网络资源操作完成时, 将会运行一个回调函数处理操作结果
 */

// console.log(require('./src/index') === require('./src/index'))
// let a = require('./src/index');
// console.log(a)

// console.log(oldModule)

/**
 * 注意:
 * 1. node 采用的 commonjs 的模块系统, 导入模块用的是 require 全局函数, 导出模块用的是 oldModule.exports 的方式
 * 2. require 方法导入本地的某个文件组件, 一定要加盘符前缀 (即便是在同一目录下也要加 ./)
 */

/**
 * node 内部提供了 Module 构造函数, 所有模块都有 Module 的实例
 * 每个模块内部都有一个 oldModule 对象, 代表当前模块
 * oldModule 属性:
 * oldModule.id 模块的识别符, 通常是带有绝对路径的模块文件名
 * oldModule.filename 模块的文件名, 带有绝对路径
 * oldModule.loaded 返回一个布尔值, 表示模块是否已经完成加载
 * oldModule.parent 返回一个对象, 表示调用该模块的模块
 * oldModule.children 返回一个数据, 表示该模块调用其他的模块
 * oldModule.exports 表示模块对外输出值
 */

// oldModule.exports = '哈哈哈'
//
// console.log(exports === oldModule.exports);    // true
/**
 * node 为每个模块提供了一个 exports 变量, 指向 oldModule.exports
 */

// console.log(require.resolve('./a'))

/**
 * require 命令的基本功能是读取并执行一个 js 文件, 然后返回改模块的 exports 对象
 * 如果没有发现指定模块, 则会得到一个空对象
 * require 命令用于加载文件, 后缀名默认为 .js
 * require 命令根据参数查找文件:
 * 1. 如果参数字符串以 / 开头, 则表示加载的是一个位于绝对路径的模块文件
 * 2. 如果参数字符串以 ./ 开头, 则表示加载的是一个位于相对路径 (跟当前执行脚本位置相比) 的模块文件
 * 3. 如果参数字符串不以 / 或 ./ 开头, 则表示加载的是一个默认提供的核心模块 (位于 node 的系统安装目录中) 或者位于各级 node_modules 目录的已安装模块 (全局安装或局部安装)
 * 4. 如果指定的模块文件没有找到, node 会尝试为文件名添加 .js、.json、.node 后, 再去搜索, .js 文件会以文本格式的 JS 脚本文件解析, .json 文件会以 JSON 格式的文本文件解析, .node 文件会以编译后的二进制文件解析
 * 5. 如果想得到 require 命令加载的确切文件名, 使用 require.resolve(path) 方法, 返回盘符路径
 * 6. 通常, 开发时会将相关文件放在一个目录里面, 便于组织, 最好为该目录设置一个入口文件, 让 require 方法可以通过这个入口文件, 加载整个目录, require 发现参数字符串指向一个目录以后, 会自动查看该目录的 package.json 文件, 然后加载 main 字段指定的入口文件, 如果 package.json 文件中没有 main 字段或者根本没有 package.json 文件, 则会加载该目录下的 index 文件
 */

/**
 * 第一次加载某个模块时, node 会缓存该模块, 以后再加载该模块, 就直接从缓存中取该模块的 oldModule.exports 属性
 */

module._load = (request, parent, isMain) =>{
    console.log(request, parent, isMain);
}
module.load()

/**
 * Module._load 执行顺序:
 * 1. 检查 Module._cache 是否缓存之中有指定模块
 * 2. 如果和缓存之中没有, 就创建一个新的 Module 实例
 * 3. 将他保存到缓存
 * 4. 使用 oldModule.load() 加载指定的模块文件, 读取文件内容之后, 使用 oldModule.compile() 执行文件代码
 * 5. 如果加载/解析过程报错, 就从缓存删除该模块
 * 6. 返回该模块的 oldModule.exports
 */
/**
 * oldModule.compile 执行:
 * 1. 生成一个 require 函数, 指向 oldModule.require
 * 2. 加载其他辅助方法到 require
 * 3. 将文件内容放到一个函数之中, 该函数可调用 require
 * 4. 执行函数
 */

/**
 * require: 加载外部模块
 * require.resolve: 将模块名解析到一个绝对路径
 * require.main: 指向主模块
 * require.cache: 指向所有缓存的模块
 * require.extensions: 根据文件的后缀名, 调用不同的执行函数
 */