/**
 * querystring 查询字符串
 */
const qs = require('querystring');
/**
 * querystring.stringify(obj[, sep[, eq[, options]]])
 * obj 网址查询字符串的对象
 * sep 查询字符串中的分隔符, 默认 &
 * eq 查询字符串中的分隔符, 默认 =
 * options encodeURIComponent 当将网址不安全额字符转为查询字符串中的百分比编码时使用函数, 默认 querystring.escape()
 */
console.log(qs.stringify({a: 'ZH-CN', b: [1, 2, 3], c: ''}));
// a=ZH-CN&b=1&b=2&b=3&c=
console.log(qs.stringify({a: 'ZH-CN', c: 'long'}, ';', ':'));
// a:ZH-CN;c:long
console.log(qs.stringify({a: '哈哈哈', c: 'long'}, ';', ':', {encodeURIComponent: encodeURI}));
// a:%E5%93%88%E5%93%88%E5%93%88;c:long
/**
 * querystring.parse(obj[, sep[, eq[, options]]])
 * obj 网址查询字符串的对象
 * sep 查询字符串中的分隔符, 默认 &
 * eq 查询字符串中的分隔符, 默认 =
 * options decodeURIComponent  当查询字符串中的百分比编码字符进行解码时使用的函数, 默认 querystring.unescape()
 */
console.log(qs.parse('a=ZH-CN&b=1&b=2&b=3&c='));
// { a: 'ZH-CN', b: [ '1', '2', '3' ], c: '' }
console.log(qs.parse('a:ZH-CN;c:long', ';', ':'));
// { a: 'ZH-CN', c: 'long' }
console.log(qs.parse('a:%E5%93%88%E5%93%88%E5%93%88;c:long', ';', ':', {decodeURIComponent: decodeURI}));
// { a: '哈哈哈', c: 'long' }