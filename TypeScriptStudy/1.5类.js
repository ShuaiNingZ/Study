// 使用 class 关键词 定义类
/**
 * 对象中主要包含两个部分:
 *      属性
 *      方法
 */
var Person = /** @class */ (function () {
    function Person() {
        // 定义实例属性
        this.name = '哈哈哈';
        // 定义只读实例属性
        this.nick = '嘿嘿';
    }
    // 定义方法
    Person.prototype.sayHello = function () {
        console.log('hello');
    };
    // 定义静态方法
    Person.sayHi = function () {
        console.log('hi');
    };
    // 在属性前使用 static 关键字可定义静态属性
    Person.age = 18;
    // 定义只读静态属性
    Person.num = 19;
    return Person;
}());
var per = new Person();
console.log(per);
console.dir(Person);
