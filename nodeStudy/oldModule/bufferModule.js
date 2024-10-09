/**
 * buffer: 临时性暂存区, 即临时存放输入和输出二进制数据的一段内存
 * buffer 作用: 代表一个缓冲区, 存储二进制数据, 是字节流, 用于文件传输时的字节流, 使 nodeJS 拥有处理二进制数据能力
 */
const { Buffer } = require("buffer");
("buffer 实例出来可以在文件中读取, http 请求得到之外, 也可以手动创建");
/**
 * Buffer.alloc 用户创建指定大小的新的缓冲对象, 不会对旧数据产生任何引用
 * Buffer.alloc(size[, fill[, encoding]])
 * size 必选 buffer 长度
 * fill 可选 填充 buffer 的值, 默认 0
 * encoding 可选, 如果填充 buffer 的值是字符串时, 指定该字符串编码默认为 'utf-8'
 */
// console.log(Buffer.alloc(10));
// <Buffer 00 00 00 00 00 00 00 00 00 00>
// console.log(Buffer.alloc(10, 'zsn'));
// <Buffer 00 00 00 00 00 00 00 00 00 00>
// console.log(Buffer.alloc(10, 'eg==', 'base64'));
// <Buffer 7a 7a 7a 7a 7a 7a 7a 7a 7a 7a>

/**
 * Buffer.allocUnsafe(size)
 * size: 新的 buffer 所需要长度
 * 以这种方式创建的 Buffer 实例的底层内存不会被初始化, 新创建的 Buffer 的内容是位置的, 可能包含敏感数据
 */
// console.log(Buffer.allocUnsafe(8));
// <Buffer 00 00 00 00 00 00 00 00>

/**
 * Buffer.from(string[, encoding])
 * 创建包含传入 string 的新 buffer
 * 参数: string 字符串
 * encoding: 编码, 默认值: utf-8
 */
// console.log(Buffer.from("zsn"));
// <Buffer 7a 73 6e>

/**
 * Buffer.from(array)
 * 使用 0 - 255 范围内的字节 array 分配新的 Buffer
 */
// console.log(Buffer.from([0x7a, 0x73, 0x6e]));
// <Buffer 7a 73 6e>

/**
 * Buffer.from(buffer)
 * buffer 要复制的 Buffer 实例
 */
// console.log(Buffer.from(Buffer.alloc(3, "zsn")));
// <Buffer 7a 73 6e>

/**
 * buffer.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
 * 将 Buffer 实例复制到 target 目标
 */
// const buf1 = Buffer.alloc(3, "zsn");
// const buf2 = Buffer.allocUnsafe(3);
// buf1.copy(buf2);
// console.log(buf1);
// <Buffer 7a 73 6e>
// console.log(buf2);
// <Buffer 7a 73 6e>

/**
 * Buffer.concat(list[, totalLength])
 * 返回 list 中所有 Buffer 实例连接在一起的新 buffer
 * list <Buffer[]> | <Unit8Array[]> 要连接的 Buffer 或 Unit8Array 实例的列表
 * totalLength <integer> 连接时 list 中 Buffer 实例的总长度
 * 注意:
 *     如果列表没有条目 或者 totalLength 为 0, 则返回新的零长度 Buffer
 *     如果未提供 totalLength, 则从 list 中的 Buffer 实例通过相加其长度来计算
 */
// console.log(Buffer.concat([Buffer.alloc(3, "z"), Buffer.alloc(3, "s")]));
// <Buffer 7a 7a 7a 73 73 73>
// console.log(Buffer.concat([Buffer.alloc(3, "z"), Buffer.alloc(3, "s")], 4));
// <Buffer 7a 7a 7a 73>

/**
 * buffer.slice([start[, end]])
 * 从 Buffer 实例中返回新的 Buffer 实例, 返回的新 Buffer 实例只是原 Buffer 实例的引用
 * 即对新返回的实例修改会影响原实例
 * start 起始位置, 默认 0
 * end 结束位置, 默认 buffer.length
 */
// const buf1 = Buffer.alloc(3, "zsn");
// console.log(buf1);
// const buf2 = buf1.slice(1, 2);
// <Buffer 7a 73 6e>
// console.log(buf2);
// <Buffer 73>

/**
 * buffer.fill(value[, offset[, end]][, encoding])
 * value 填充值
 * offset 再开始填充 buffer 之前要跳过的字节数, 默认值 0
 * end 结束填充 buffer (不包括在内) 的位置, 默认值 buffer.length
 * encoding 如果 value 值为字符串, 则为字符串编码, 默认 utf-8
 */
// const buf1 = Buffer.allocUnsafe(8).fill("zsn");
// console.log(buf1);
// <Buffer 7a 73 6e 7a 73 6e 7a 73>

/**
 * buffer.toString([encoding[, start[, end]]])
 * encoding: 使用的字符串编码, 默认 utf-8
 * start: 开始位置, 默认 0
 * end: 结束位置, 默认 buffer.length
 */
// const buf1 = Buffer.allocUnsafe(26);
// for (let i = 0; i < 26; i++) {
//     // 97 是 'a' 的十进制 ASCII 值。
//     buf1[i] = i + 97;
// }
// console.log(buf1.toString());
// abcdefghijklmnopqrstuvwxyz

/**
 * Buffer.from(string[, encoding])
 * string 字符串
 * encoding 编码 默认值: utf-8
 */
const buf1 = Buffer.from("hello buffer");
console.log(buf1);
