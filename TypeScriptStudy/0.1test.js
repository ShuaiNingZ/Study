// TODO typeof
function fn(x) {
    return [x];
}
// {
//     id: number,
//     name: string,
//     age: number,
//     timestamp: never
// }
// 实现交叉类型
function crossType(a, b) {
    for (var key in b) {
        a[key] = b[key];
    }
    return a;
}
crossType({
    id: 1,
    name: 'string'
}, {
    id: 21,
    age: 24
});
// TODO 联合类型
// 联合类型: 或者, 取多个类型中的一种类型 或 只能访问共有属性或方法
// 语法: 类型一 | 类型二
var union;
union = '50';
union = 10;
var union3;
var age = 25;
var point = {
    x: 10,
    y: 20
};
// TODO 索引类型
// 索引类型: 让 TS 编译器覆盖监测到使用动态属性名的代码
'索引类型查询操作符 keyof';
var Token = /** @class */ (function () {
    function Token() {
        this.accessExp = 60 * 60;
        this.refreshExp = 60 * 60 * 24 * 30 * 3;
    }
    return Token;
}());
// "accessExp" | "refreshExp"
// class 中 keyof T 的结果为 公共属性名的联合
'索引访问操作符 T[K]';
// string
// 一个对象类型为泛型 T, 这个对象的属性 K 只要满足 K extends keyof T
// 即可得到这个属性值的类型为 T[K]
function getProperty(o, name) {
    return o[name];
}
var person = {
    name: "竹木",
    age: 25
};
var nameVal = getProperty(person, 'name');
console.log(nameVal); // 竹木
var ageVal = getProperty(person, 'age');
console.log(ageVal); //
