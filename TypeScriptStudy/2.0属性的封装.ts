// 定义一个表示人的类
class Person {
    // TS 可以在属性前面添加属性的修饰符
    /**
     * public 修饰的属性可以在任意位置访问(修改) 属性默认值
     * private 私有属性, 私有属性只能在类内部进行访问 (修改)
     *      设置完 private 之后, 可以在 tsconfig.json 中使用 noEmitOnError: true 错误时不在编译
     *      可以在类中添加方法使得私有属性可以被外部访问
     * protected 受保护的属性, 只能再当前类和当前类的子类中访问(修改)
     */
    private _name: string;
    private _age: number

    constructor(name, age) {
        this._name = name;
        this._age = age;
    }

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
    get name() {
        return this._name;
    }

    set name(value: string) {
        this._name = value
    }
}

const per = new Person('悟空', 18);
console.log(per);

/**
 * 现在属性是再对象中设置的, 属性可以任意的被修改
 *      属性可以任意被修改将会导致对象中的数据变得非常不安全
 */
// per._name = '八戒';
// per._age = -21;
// console.log(per)

console.log(per.name);
per.name = '八戒'

class A {
    protected num: number

    constructor(num: number) {
        this.num = num;
    }
}

class B extends A {
    test() {
        console.log(this.num)
    }
}

const b = new B(123);

class C {
    // 可以直接将属性定义在构造函数中
    constructor(public name: string, public age: number) {
    }
}
// C 和 D 两种两个类实现的效果是一样的, C 是简写
class D {
    name: string;
    age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}