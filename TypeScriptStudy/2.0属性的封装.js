var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 定义一个表示人的类
var Person = /** @class */ (function () {
    function Person(name, age) {
        this._name = name;
        this._age = age;
    }
    Object.defineProperty(Person.prototype, "name", {
        /**
         * getter 方法用来读取属性
         * setter 方法用来设置属性
         *      它们被称为属性的存取器
         */
        // getName() {
        //     return this._name
        // }
        //
        // setName(value: string) {
        //     this._name = value
        // }
        // TS 中设置 get特然 方法的方式
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
var per = new Person('悟空', 18);
console.log(per);
/**
 * 现在属性是再对象中设置的, 属性可以任意的被修改
 *      属性可以任意被修改将会导致对象中的数据变得非常不安全
 */
// per._name = '八戒';
// per._age = -21;
// console.log(per)
console.log(per.name);
per.name = '八戒';
var A = /** @class */ (function () {
    function A(num) {
        this.num = num;
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.test = function () {
        console.log(this.num);
    };
    return B;
}(A));
var b = new B(123);
var C = /** @class */ (function () {
    // 可以直接将属性定义在构造函数中
    function C(name, age) {
        this.name = name;
        this.age = age;
    }
    return C;
}());
// C 和 D 两种两个类实现的效果是一样的, C 是简写
var D = /** @class */ (function () {
    function D(name, age) {
        this.name = name;
        this.age = age;
    }
    return D;
}());
