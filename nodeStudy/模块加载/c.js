console.log('c.js', require('./a.js').x);

console.log('c.js', require('./b.js').x);

// let a = require('./a.js');
// let b = require('./b.js');

// console.log('c.js', require.main === oldModule);
/**
 * 执行 c.js
 * 第一步:
 *      激活第一个 console.log
 *      里面的 require 指令 请求 a.js
 *  第二步:
 *      a.js
 *      第一行激活, a.js 此时的输出x的值 a1
 *      第二行激活, 激活 require 指令 b.js
 *  第三步:
 *      b.js
 *      第一行激活, b.js 此时的输出x的值 b1
 *      第二行激活, 激活 require 指令 a.js 得到此时
 *      x值 a1, 输出// b.js a1
 *      第三行激活, b.js 此时输出 x 值 是 b2
 *  第四步:
 *      a.js
 *      第二行, b.js 执行完成得到返回值 b2
 *      输出// a.js b2
 *      第三行激活, a.js 此时的输出 x 是 a2
 *  第五步:
 *      c.js
 *      第一行, a.js 执行完成输出// c.js a2
 *      第二行激活, b.js 已经执行完成 输出// c.js b2
 */

// 注意点: 一个模块在其没有执行完成, 就有输出状态, 只不过是个临时状态, 待到执行完成之后, 输出的状态可能会发生一个改变