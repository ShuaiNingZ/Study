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
var Animal = /** @class */ (function () {
    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }
    Animal.prototype.sayHello = function () {
        console.log('动物在叫');
    };
    return Animal;
}());
/**
 * Dog extends Animal
 *      此时 Animal 被称为父类, Dog 被称为子类
 *      使用继承后, 子类将会拥有父类所有的方法和属性
 *      通过继承可以讲多个类中共有的代码写在一个父类中
 *          这样只需要写一次即可让所有的子类都同时拥有父类中的属性
 *          如果希望在子类中添加一些父类中没有的属性或方法直接加就行
 *      如果在子类中添加了和父类相同的方法, 则子类方法会覆盖父类方法
 *          子类覆盖掉父类方法的形式, 称之为方法重写
 */
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.sayHello = function () {
        console.log('汪汪汪');
    };
    Dog.prototype.run = function () {
        console.log("".concat(this.name, "\u5728\u8DD1"));
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name, age, sex) {
        var _this = 
        // 如果在子类中写了构造函数, 在子类构造函数中必须对父类的构造函数进行调用
        // super.age super 指向父类
        _super.call(this, name, age) || this;
        _this.sex = sex;
        return _this;
    }
    Cat.prototype.sayHello = function () {
        console.log('喵喵喵');
    };
    return Cat;
}(Animal));
var dog = new Dog('旺财', 2);
console.log(dog);
dog.sayHello();
dog.run();
var cat = new Cat('猫咪', 2, 0);
console.log(cat);
cat.sayHello();
