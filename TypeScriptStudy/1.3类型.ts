// 字面量声明类型
let a: 10;
a = 10;
// a = 11; // 报错, a 只能是 10

// | 或者的意思, 联合类型 |
let b: 'male' | 'female';
b = 'male';
b = 'female';

let c: boolean | string;
c = true;
c = 'hello';

// & 表示同时, 且的意思
let j: { name: string } & { age: number }
j = {name: '哈哈哈', age: 18}

// any 任意类型
let d: any; // 显示 any

// 声明变量如果不指定类型, 则 TS 解析器会自动判断变量类型为 any (隐式 any)

// unknown 表示未知类型的值
let e: unknown;
e = 10;
e = 'hello';
e = true;
let s: string;
// d 的类型是 any, 它可以赋值给任意类型的变量 (所以不建议使用 any)
s = d;
// s = e; 报错,
// any 和 unknown 的区别就是 any可以赋值给任意类型不报错,
// unknown 赋值给定义好的类型时报错 (除了 any 以外)
// unknown 是类型安全的 any, unknown 类型的变量, 不能直接赋值给其他类型的变量

// 如果想直接将 unknown 的值赋值给其他类型的变量
// 方法一
if (typeof e === 'string') {
    s = e;
}
// 方法二 类型断言, 用来告诉解析器变量的实际类型
/**
 * 类型断言语法:
 *      变量 as 类型
 *      <类型>变量
 */
s = e as string;
s = <string>e;

// void 用来表示空, 函数没有返回值
function fn(): void {

}

// never 表示永远不会返回结果, 抛出错误程序终止时使用
function fn1(): never {
    throw new Error('报错了')
}

// object 表示 js 对象
let n: object;
n = {};
n = function () {
}

// {} 用来指定对象中可以包含哪些属性
// 语法: {
//     属性名: 属性值
//     属性名?: 属性值
//     [propName: string]: any
// }
// 在属性名后面加上 ?, 表示属性是可选的
// propName(名字可以任意 xxx) [propName: string] 表示任意字符串属性名
let m: {
    name: string,
    age?: number,
    [propName: string]: any
};
m = {
    name: '哈哈哈',
    gender: '难'
}

/**
 * 设置函数解构的类型声明
 *      语法: (形参: 类型, 形参: 类型 ...) => 返回值
 */
let f: (a: number, b: number) => number;
let f1 = function (a: number, b: number): number {
    return 1
}

/**
 * 数组的类型声明:
 *      类型[]
 *      Array<类型>
 */
// string[] 表示数组的每一项都是字符串
let g: string[]
// number[] 表示数组的每一项都是数字
let g1: number[]
let g2: Array<number>

/**
 * 元组, 元组就是固定长度的数组
 *      语法: [类型, 类型, 类型]
 */
let h: [string, number];
h = ['123', 124]

/**
 * enum 枚举
 */
enum genderType {
    Male,
    Female
}

let i: { name: string, gender: genderType }
i = {
    name: '哈哈哈',
    gender: genderType.Male
}

// 类型的别名
type myType = 1 | 2 | 3 | 4 | 5;
let k: myType;
let k1: myType;
