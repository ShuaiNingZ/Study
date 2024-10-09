// Truthy 指的是转换后的值为 真 的值, Falsy 是 Boolean 上下文中已认定可转为 假 的值
// ! 操作符表示取反
// !! 表示变量被强制类型转换为布尔值之后的值


// TODO 模块化
// 模块在其自身的作用域里执行, 而不是全局作用域里
// export: 导出模块中的变量、函数、类、接口等
// import: 导入其他模块导出的变量、函数、类、接口等
// TS 为了支持 CommonJS 和 AMD 的 exports, 提供了 export = 语法
// 若使用 export = 导出一个模块, 则必须使用 import oldModule = require('oldModule') 导入
/*
'Test.ts'
interface User {
    name: string
}
export = User;
'Demo.ts'
import TestUser = require('./Test');
const user: TestUser = {
    name: '哈哈哈'
}
*/

// TODO 命名空间
import {type} from "os";

'namespace 关键字'
// 命名空间本质上就是一个对象, 将其内部的变量组织到这个对象的属性上
namespace Calculate {
    const fn = (x: number, y: number) => x * y;
    export const add = (x: number, y: number) => x + y;
}
// 编译后的结果
'use strict';
// var Calculate;
// (function (Calculate) {
//     var fn = function (x, y) { return x * y; };
//     Calculate.add = function (x, y) { return x + y; };
// })(Calculate || (Calculate = {}));
// Calculate.add(2, 3);

// TODO 声明合并
// TS 编译器会将程序中多个具有相同名称的声明合并为一个声明
// TS 中声明会创建以下三种实体之一: 命名空间、类型或值
// namespace 创建命名空间、创建值
// class、enum 创建类型、创建值
// interface、type alias 创建类型
// function、variable 创建值

'合并接口'

interface Box {
    width: number
    height: number
}

interface Box {
    scale: number
    width: number
}

let box: Box = {
    width: 10,
    height: 10,
    scale: 1
}
// 接口合并, 则接口的非函数的成员必须是唯一的, 哪怕不唯一, 最起码也要类型相同, 类型不同, 报错
// 对于函数成员, 每个同名函数声明都会被当成这个函数的一个重载, 后面的接口具有更高的优先级
// 接口合并时, 遵循规范:
//      接口内优先级自上而下
//      后面的接口具有更高优先级
//      如果函数的参数是字符串字面量, 会被提升到函数声明的最顶端
interface Document {
    createElement(tagName: any): Element // 5
}

interface Document {
    createElement(tagName: 'div'): HTMLDivElement   // 2
    createElement(tagName: 'span'): HTMLSpanElement // 3
}

interface Document {
    createElement(tagName: string): HTMLElement // 4
    createElement(tagName: 'canvas'): HTMLCanvasElement // 1
}

// 合并结果
interface Document {
    createElement(tagName: 'canvas'): HTMLCanvasElement // 1
    createElement(tagName: 'div'): HTMLDivElement   // 2
    createElement(tagName: 'span'): HTMLSpanElement // 3
    createElement(tagName: string): HTMLElement // 4
    createElement(tagName: any): Element // 5
}

// 合并命名空间
// 合并多个具有相同名称的命名空间
//      导出成员不可重复定义
//      非导出成员仅在其原有的 (合并前的) 命名空间内可见
namespace A {
    let used = true;

    export function fn() {
        return used;
    }
}
namespace A {
    export function fnOther() {
        // return used;    // Error, 未找到变量 used
    }
}
A.fn();
A.fnOther();


'命名空间与类的合并'
// 合并名称相同的命名空间与类:
//      命名空间内的成员必须导出, 合并后的类才能访问
//      命名空间内导出的成员, 相当于合并后类的静态属性
//      命名空间要放在类的定义后面
class Album {
    label!: Album.AlbumLabel
}

namespace Album {
    export class AlbumLabel {
    }

    export const num = 10
}
console.log(Album.num) // 10

'命名空间与枚举的合并'

// 命名空间可以用来扩展枚举类型
enum Color {
    red = 1,
    green = 2,
    blue = 4
}

namespace Color {
    export function mixColor(colorName: string) {
        switch (colorName) {
            case 'yellow':
                return Color.red + Color.green
            case 'white':
                return Color.red + Color.green + Color.blue
            default:
                break;
        }
    }
}
console.log(Color.mixColor('yellow')) // 3



















