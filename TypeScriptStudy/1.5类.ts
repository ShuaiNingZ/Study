// 使用 class 关键词 定义类
/**
 * 对象中主要包含两个部分:
 *      属性
 *      方法
 */
class Person {
    // 定义实例属性
    name: string = '哈哈哈';
    // 定义只读实例属性
    readonly nick = '嘿嘿';
    // 在属性前使用 static 关键字可定义静态属性
    static age: number = 18;
    // 定义只读静态属性
    static readonly num: number = 19;

    // 定义方法
    sayHello() {
        console.log('hello')
    }
    // 定义静态方法
    static sayHi() {
        console.log('hi')
    }
}

const per = new Person();

console.log(per)
console.dir(Person)