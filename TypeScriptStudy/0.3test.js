var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function createIterator(array) {
    var index = 0;
    var len = array.length;
    return {
        next: function () {
            return index < len
                ? { value: array[index++], done: false }
                : { value: undefined, done: true };
        }
    };
}
var iterator = createIterator([1, 2, 4]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
// 可迭代性
// 只有拥有 Symbol.iterator 的属性, 才是可迭代的
// 如: Array, Map, Set, String, Int32Array 等
// Symbol.iterator 属性本身是一个函数, 就是当前数据结构默认的迭代
// 器生成函数, 执行这个函数, 就会返回一个迭代器
var str = 'Hi';
console.log(typeof str[Symbol.iterator]); // function
var iterator1 = str[Symbol.iterator]();
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
'for...of 只能遍历可迭代的对象, 即拥有迭代器接口的对象, 即原型链或者自身有 Symbol.iterator 方法的对象';
/**
 * for...of 遍历可迭代对象
 * for...in 遍历可枚举属性对象, 按任意顺序迭代
 */
var obj = {
    a: 1,
    b: {
        n: 12
    },
    c: Symbol(123),
    d: function () {
    }
};
Object.prototype[Symbol.iterator] = function () {
    var _this = this;
    var i = 0;
    var props = Reflect.ownKeys(this);
    return {
        next: function () {
            var value = props[i++];
            return i <= props.length
                ? {
                    value: [value, _this[value]],
                    done: false
                }
                : {
                    value: undefined,
                    done: true
                };
        }
    };
};
var objIterator = obj[Symbol.iterator]();
console.log(objIterator.next()); // {"value":["a",1],"done":false}
console.log(objIterator.next()); // {"value":["b",{"n":12}],"done":false}
console.log(objIterator.next()); // {"value":["c",null],"done":false}
console.log(objIterator.next()); // {"value":["d",null],"done":false}
console.log(objIterator.next()); // {"done":true}
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
function generatorFunction() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('开始执行');
                return [4 /*yield*/, 'Hello'];
            case 1:
                _a.sent();
                console.log('暂停后再次执行');
                return [4 /*yield*/, 'world'];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
var generator = generatorFunction();
console.log(generator);
console.log(generator === generator[Symbol.iterator]()); // true
console.log(generator.next()); // {value: 'Hello', done: false}
console.log(generator.next()); // {value: 'world', done: false}
// yield 会将后面的值转成 {value: 值, done: false} 对象
'通过 next() 参数向生成器传值';
function gen() {
    var res1, res2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, 1];
            case 1:
                res1 = _a.sent();
                console.log(res1);
                return [4 /*yield*/, 2];
            case 2:
                res2 = _a.sent();
                console.log(res2);
                return [2 /*return*/, 3];
        }
    });
}
var gener = gen();
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
