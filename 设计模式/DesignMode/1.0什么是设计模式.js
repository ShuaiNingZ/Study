// 什么是设计模式
// 设计模式定义:
// 在面向对象软件设计过程中针对特定问题的简介而优雅的解决方案,
// 即: 设计模式是在某种场合下针对某个问题的解决方案
//
// 所有设计模式的实现都遵循'找出程序中变化的地方, 并将变化封装起来'的原则

// 多态定义: 同一操作作用于不同的对象上面, 可以产生不同的解释和不同的执行结果
// 即: 给不同的对象发送同一个消息, 这些对象会根据这个消息分别给出不同的反馈
// 多态思想: 将 '做什么' 和 '谁去做' 以及 '怎样做' 分离开来
// 即: '不变的事物' 与 '可能变得事物' 分离开来

/*let Duck = function () {
}
Duck.prototype.soud = function () {
    console.log('嘎嘎嘎')
}
let Chicken = function () {
}
Chicken.prototype.soud = function () {
    console.log('咯咯咯')
}
let makeSound = function (animal) {
    animal.soud();
}
makeSound(new Duck());
makeSound(new Chicken());*/

// 封装目的是将核心信息隐藏, 不暴露实现的过程, 只留出接口使用即可
// 即: 封装为了降低复杂度
/*let obj = (function () {
    let _name = 'sn';
    return {
        getName() {
            return _name;
        }
    }
})()
console.log(obj.getName())
console.log(obj._name)*/

// 封装实现, 实现查找一个数组中的符合条件的对象的实现方法
/*Array.prototype.findCondition = function (findData) {
    let localKeys = []
    for (let [index, element] of this.entries()) {
        localKeys.push(...Object.keys(element))
    }
    localKeys = [...new Set(localKeys)];
    let argKeys = Object.keys(findData);
    argKeys.forEach(searchKey => {
        if (!localKeys.includes(searchKey)) {
            throw '没有符合条件的数据'
        }
    })
    return this.filter((item) => {
        let matchState = [];
        for (let i = 0; i < argKeys.length; i++) {
            matchState.push(item[argKeys[i]] === findData[argKeys[i]]);
        }
        return !matchState.includes(false)
    })
}

let arr = [
    {
        name: '123',
        age: 12,
        sex: 1,
        size: 180
    },
    {
        name: '345',
        age: 16,
        sex: 1,
        size: 23
    },
    {
        name: '456',
        age: 25,
        sex: 0,
        size: 234
    }
]

console.log(arr.findCondition({name: '123'}))*/

