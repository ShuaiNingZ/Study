/**
 * 通过闭包实现模块化协作
 *      实现三个模块
 *          A 数据模块
 *          B 工具模块
 *          C 主模块
 * A 模块内部私有私有变量为数组 外部只能通过特定方法修改数组 读取数组
 * B 模块提供数组修改方法 暴露到外部使用
 *      1. 原生实现 reduce 方法
 *      2. 原生实现 map 方法
 * C 模块利用模块 B 提供的方法 操作 模块 A 内部的私有变量数组
 */

let dataModules = (function () {
    let arr = [5, 1, 3, 54, 6, 7, 2, 234, 5, 6, 343]

    return {
        get() {
            return arr
        },
        set(val) {
            arr = val;
        }
    }
})();

let toolsModules = (function () {
    return {
        reduce(arr, callback, initVal) {
            let val = initVal !== undefined ? initVal : undefined;
            for (let i = 0; i < arr.length; i++) {
                if (val !== undefined) {
                    val = callback(val, arr[i])
                    continue;
                }
                val = callback(0, arr[i]);
            }
            return val
        },
        map(arr, callback) {
            const resultArr = [];
            for (let i = 0; i < arr.length; i++) {
                resultArr.push(callback(arr[i], i, arr))
            }
            return resultArr;
        }
    }
})();

let mainModules = (function () {
    let data = dataModules;
    let tools = toolsModules;

    console.log(dataModules, tools)
    console.log(tools.reduce(dataModules.get(), (a, b) => {
        return a + b
    }, 0))
    console.log(tools.map(dataModules.get(), (item) => {
        return item + 1
    }))
})()