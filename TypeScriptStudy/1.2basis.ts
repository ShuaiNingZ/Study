// 声明一个变量 a, 同时指定他的类型为 number
let a1: number;

// a 的类型设置为 number, 在以后的使用过程中 a 的值只能是数字
a1 = 12;
// a1 = ''; // 此行代码会报错, 因为 a 是 number, 不能赋值字符串


// 声明变量直接进行赋值
let c1: boolean = false;

// 如果变量的声明和赋值是同时进行的, TS 可以自动对变量进行类型检测
let d1 = false;

// JS 中的函数是不考虑参数的类型和个数的
// function sum(a, b) {
//     return a + b;
// }

function sum(a: number, b: number): number {
    return a + b;
}

let result = sum(12, 32);

console.log(result);

