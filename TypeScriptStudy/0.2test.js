'namespace 关键字';
"use strict";
exports.__esModule = true;
// 命名空间本质上就是一个对象, 将其内部的变量组织到这个对象的属性上
var Calculate;
(function (Calculate) {
    var fn = function (x, y) { return x * y; };
    Calculate.add = function (x, y) { return x + y; };
})(Calculate || (Calculate = {}));
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
'合并接口';
var box = {
    width: 10,
    height: 10,
    scale: 1
};
// 合并命名空间
// 合并多个具有相同名称的命名空间
//      导出成员不可重复定义
//      非导出成员仅在其原有的 (合并前的) 命名空间内可见
var A;
(function (A) {
    var used = true;
    function fn() {
        return used;
    }
    A.fn = fn;
})(A || (A = {}));
(function (A) {
    function fnOther() {
        // return used;    // Error, 未找到变量 used
    }
    A.fnOther = fnOther;
})(A || (A = {}));
A.fn();
A.fnOther();
'命名空间与类的合并';
// 合并名称相同的命名空间与类:
//      命名空间内的成员必须导出, 合并后的类才能访问
//      命名空间内导出的成员, 相当于合并后类的静态属性
//      命名空间要放在类的定义后面
var Album = /** @class */ (function () {
    function Album() {
    }
    return Album;
}());
(function (Album) {
    var AlbumLabel = /** @class */ (function () {
        function AlbumLabel() {
        }
        return AlbumLabel;
    }());
    Album.AlbumLabel = AlbumLabel;
    Album.num = 10;
})(Album || (Album = {}));
console.log(Album.num); // 10
'命名空间与枚举的合并';
// 命名空间可以用来扩展枚举类型
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 4] = "blue";
})(Color || (Color = {}));
(function (Color) {
    function mixColor(colorName) {
        switch (colorName) {
            case 'yellow':
                return Color.red + Color.green;
            case 'white':
                return Color.red + Color.green + Color.blue;
            default:
                break;
        }
    }
    Color.mixColor = mixColor;
})(Color || (Color = {}));
console.log(Color.mixColor('yellow')); // 3
