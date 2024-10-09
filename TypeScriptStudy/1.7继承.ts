class Animal {
    name: string;
    age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log('动物在叫')
    }
}

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
class Dog extends Animal {
    sayHello() {
        console.log('汪汪汪')
    }

    run() {
        console.log(`${this.name}在跑`)
    }
}

class Cat extends Animal {
    sex: number;

    constructor(name, age, sex: number) {
        // 如果在子类中写了构造函数, 在子类构造函数中必须对父类的构造函数进行调用
        // super.age super 指向父类
        super(name, age);
        this.sex = sex;
    }

    sayHello() {
        console.log('喵喵喵')
    }
}

const dog = new Dog('旺财', 2);
console.log(dog)
dog.sayHello()
dog.run()

const cat = new Cat('猫咪', 2, 0);
console.log(cat)
cat.sayHello()
