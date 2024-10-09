// 声明一个变量 a, 同时指定他的类型为 number
var a1;
// a 的类型设置为 number, 在以后的使用过程中 a 的值只能是数字
a1 = 12;
// a1 = ''; // 此行代码会报错, 因为 a 是 number, 不能赋值字符串
// 声明变量直接进行赋值
var c1 = false;
// 如果变量的生命和赋值是同时进行的, TS 可以自动对变量进行类型检测
var d1 = false;
// JS 中的函数是不考虑参数的类型和个数的
// function sum(a, b) {
//     return a + b;
// }
function sum(a, b) {
    return a + b;
}
var result = sum(12, 32);
console.log(result);
