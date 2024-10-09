// 描述一个对象的类型
type myType = {
    name: string;
    age: number;
    [propName: string]: string | number;
}

/**
 * 接口用来定义一个类解构, 用来定义一个类中应该包含哪些属性和方法
 *      同时接口也可以当成类型声明去使用
 * type 不能同名声明, interface 可以同名声明, 但是使用时会将多个声明合并
 */
interface myInterface {
    name: string;
    age: number;
}

interface myInterface {
    sex: number
}

const obj: myInterface = {
    name: '',
    age: 1,
    sex: 0
}

/**
 * 接口可以再定义类的时候去限制类的结构
 *      接口中的所有的属性都不能有实际的值
 *      接口之定义对象的结构, 而不考虑实际值
 *          在接口中所有的方法都是抽象方法
 */
interface myInter {
    name: string;

    sayHello(): void;
}

/**
 * 定义类时, 可以使用类去实现一个接口
 *      实现接口就是使类满足接口的要求
 */
class MyClass implements myInter {
    name: string;

    constructor(name) {
        this.name = name;
    }

    sayHello() {
    }
}