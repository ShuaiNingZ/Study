const { URL } = require("url");
/**
 * new URL(input[, base])
 * input 绝对或相对的网址,
 * 若 input 是相对的, 则需要 base,
 * 若 input 是绝对的, 则忽略 base,
 * 若 input 不是字符串, 则先转成字符串
 * base 若 input 不是绝对的, 则为基本网址,
 * 若 base 不是字符串, 则先转为字符串
 */
// 网址构造函数可作为全局对象的属性访问
console.log(URL === globalThis.URL);
console.log(
    new URL("/e/search/result/?searchid=108", "http://www.netbian.com")
);
// {
//     href: 'http://www.netbian.com/e/search/result/?searchid=108',
//     origin: 'http://www.netbian.com',
//     protocol: 'http:',
//     username: '',
//     password: '',
//     host: 'www.netbian.com', 主机部分
//     hostname: 'www.netbian.com',  主机名部分
//     port: '',
//     pathname: '/e/search/result/',
//     search: '?searchid=108',
//     searchParams: URLSearchParams { 'searchid' => '108' },
//     hash: ''
// }
/**
 * url.hash
 * 获取和设置网址的片段部分
 */
const aUrl = new URL("http://www.netbian.com/#/search");
console.log(aUrl.hash); // #/search
aUrl.hash = "/setting";
console.log(aUrl.hash); // #/setting
/**
 * url.host
 * 获取和设置网址的主机部分及设置主机端口号
 */
const bUrl = new URL("http://www.netbian.com/");
console.log(bUrl.host); // www.netbian.com
bUrl.host = "baidu.com";
console.log(bUrl.host); // baidu.com
bUrl.host = "baidu.com:8080";
console.log(bUrl.host); // baidu.com:8080
/**
 * url.hostname
 * 获取和设置网址的主机名部分
 */
const cUrl = new URL("http://www.netbian.com/");
console.log(cUrl.hostname); // www.netbian.com
cUrl.hostname = "baidu.com:8080";
console.log(cUrl.hostname); // www.netbian.com  不能更改端口号
cUrl.hostname = "baidu.com";
console.log(cUrl.hostname); // baidu.com
/**
 * url.href
 * 获取和设置序列化的网址
 */
const dUrl = new URL("http://www.netbian.com/");
console.log(dUrl.href); // http://www.netbian.com/
dUrl.href = "https://baidu.com/";
console.log(dUrl.href); // https://baidu.com/
// 若 input 或 base 不是有效的网址, 则将抛出错误, 注意, 会将给定的值强制转换为字符串
console.log(new URL({ toString: () => "http://baidu.com/" }).href);
// http://baidu.com/
/**
 * url.origin
 * 获取网址的源的只读的序列化
 */
const eUrl = new URL("http://www.netbian.com/");
console.log(eUrl.origin); // http://www.netbian.com
/**
 * url.pathname
 * 获取和设置网址的路径部分
 */
const fUrl = new URL("http://www.netbian.com/file");
console.log(fUrl.pathname); // /file
fUrl.pathname = "/oldimg";
console.log(fUrl.pathname); // /oldimg
/**
 * url.port
 * 获取和设置网址的端口部分
 * 协议       默认端口
 * ftp          21
 * file
 * http         80
 * https        443
 * ws           80
 * wss          443
 */
/**
 * url.protocol
 * 获取和设置网址的协议部分
 */
const gUrl = new URL("http://www.netbian.com/file");
console.log(gUrl.protocol); // http:
gUrl.protocol = "ftp";
console.log(gUrl.protocol); // ftp:
/**
 * url.search
 * 获取和设置网址的协议部分
 */
const hUrl = new URL("http://www.netbian.com/search?123");
console.log(hUrl.search); // ?123
hUrl.search = "haha=567";
console.log(hUrl.search); // ?haha=567
/**
 * url.searchParams
 * 获取网址查询参数的 URLSearchParams 对象, 此属性只读
 * 由于 URLSearchParams 对象可以更改网址实力, 要替换网址的整个查询参数, 使用 url.search 设置器
 */
const iUrl = new URL("http://www.netbian.com/search?123");
console.log(iUrl.searchParams); // URLSearchParams { '123' => '' }
iUrl.search = "haha=567";
console.log(iUrl.searchParams); // URLSearchParams { 'haha' => '567' }
