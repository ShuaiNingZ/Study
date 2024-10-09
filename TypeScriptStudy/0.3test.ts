// TODO iterator 迭代器
// 迭代器是一种特殊对象, 它符合迭代器协议规范.
// 在 TS 中, 可以定义一个接口, 这个接口上有一个函数类型 next
// next() 方法的返回值类型是 { value: any, done: boolean }
// 其中, value 是 any 类型, 表示下一个将要返回的值, done 是布尔类型
// 当没有更多可返回数据时返回 true, 迭代器还会保存一个内部指针, 用来
// 指向当前集合中值的位置. 迭代器创建后, 可以重复调用 next() 显式迭代
interface IteratorInterface {
    next: () => {
        value: any
        done: boolean
    }
}

function createIterator(array: any[]): IteratorInterface {
    let index = 0;
    let len = array.length;

    return {
        next: function () {
            return index < len
                ? {value: array[index++], done: false}
                : {value: undefined, done: true}
        }
    }
}

let iterator = createIterator([1, 2, 4]);
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 可迭代性
// 只有拥有 Symbol.iterator 的属性, 才是可迭代的
// 如: Array, Map, Set, String, Int32Array 等
// Symbol.iterator 属性本身是一个函数, 就是当前数据结构默认的迭代
// 器生成函数, 执行这个函数, 就会返回一个迭代器
let str: string = 'Hi';
console.log(typeof str[Symbol.iterator]) // function
let iterator1: IterableIterator<string> = str[Symbol.iterator]();

console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
'for...of 只能遍历可迭代的对象, 即拥有迭代器接口的对象, 即原型链或者自身有 Symbol.iterator 方法的对象'
/**
 * for...of 遍历可迭代对象
 * for...in 遍历可枚举属性对象, 按任意顺序迭代
 */

let obj: any = {
    a: 1,
    b: {
        n: 12
    },
    c: Symbol(123),
    d: function () {
    }
}
Object.prototype[Symbol.iterator] = function () {
    let i: number = 0;
    const props: (string | symbol)[] = Reflect.ownKeys(this);
    return {
        next: () => {
            let value: (string | symbol) = props[i++];
            return i <= props.length
                ? {
                    value: [value, this[value]],
                    done: false
                }
                : {
                    value: undefined,
                    done: true
                }
        }
    }
}
const objIterator = obj[Symbol.iterator]();
console.log(objIterator.next());  // {"value":["a",1],"done":false}
console.log(objIterator.next());  // {"value":["b",{"n":12}],"done":false}
console.log(objIterator.next());  // {"value":["c",null],"done":false}
console.log(objIterator.next());  // {"value":["d",null],"done":false}
console.log(objIterator.next());  // {"done":true}

// TODO 生成器 Generator
// 生成器是一种能够中途停止, 然后从停止的地方继续运行的函数
// 可借助 yield 或 return 停止函数运行

// 通过 function* 来创建一个生成器函数, 在调用一个生成器函数后,
// 并不会立即执行函数中的代码, 而是会返回一个迭代器对象, 通过调用
// 迭代器对象的 next() 方法, 可以活的 yield/return 的返回值

// 生成器函数的特殊性
// 一个正好藏的函数, 如果没有 return 或者 throw 一个异常,
// 一旦被调用在运行结束之前是不会停止的, 如果在此调用这个函数, 它会再次
// 从第一行开始执行, 相反, 生成器函数可以中途停止, 然后从停止的地方继续执行的
// 生成器函数会返回一个对象, 可以调用这个对象上的 next() 方法

function* generatorFunction() {
    console.log('开始执行');
    yield 'Hello'

    console.log('暂停后再次执行');
    yield 'world'
}

let generator = generatorFunction();
console.log(generator)
console.log(generator === generator[Symbol.iterator]()) // true
console.log(generator.next()); // {value: 'Hello', done: false}
console.log(generator.next()); // {value: 'world', done: false}
// yield 会将后面的值转成 {value: 值, done: false} 对象

'通过 next() 参数向生成器传值'

function* gen() {
    let res1 = yield 1;
    console.log(res1)
    let res2 = yield 2;
    console.log(res2)
    return 3
}

let gener = gen();
console.log(gener.next('first'));
// {value: 1, done: false}
console.log(gener.next('second'));
// second
// {value: 2, done: false}
console.log(gener.next('third'));
// third
// {value: 3, done: true}

// 生成器最大的好处就是可以讲异步回调代码变成同步代码
// async await 就是基于生成器函数的语法糖


































