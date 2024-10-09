const fs = require('fs');
const EventEmitter = require('events');
let count = 0;

/**
 * node 开发中 大部分时候 我们都在 异步回到操作
 *
 * 事件 events 可以帮助我们 在一个复杂回到工程外 去监听某一个事件的发生
 *
 * events 自定义事件
 *
 * 1. 实例化 events
 * 2. events 的实例化 eventEmit
 *      1. 监听 eventEmit.on('eventName', function(){})
 *      2. 触发事件 eventEmit.emit('eventName')
 *
 *      emit() 主动触发事件
 *          参数:
 *              1. 事件名称{String}
 *              2. ...N arguments 自定义实参
 *
 *      on() 监听自定义事件回调
 *              1. 事件名称{String}
 *              2. 回调函数{Function}
 *                  1. ...N 对应 emit 第一个实参之后的参数
 *      once()同 on
 *          区别: 只触发一次的监听器, 触发之后, 自动解绑监听
 *      off() 解绑 on 监听的事件
 *          参数:
 *              1. 解绑的事件名称(必传 与 on 参数保持一致)
 *              2. 解绑后的回调函数(必传 与 on 参数保持一致)
 *      removeAllListeners 移除对应时间所有的回调函数
 *          参数:
 *              event 事件名称
 *      eventNames() 返回已经注册的事件名称列表
 *
 *      注: node 开发中, 任何回调异步机制的方法, 必须床底回调函数参数, 就算你没有回调操作
 *          需求, 也必须传递 callback 参数
 */

/*
let eventEmit = new EventEmitter();
console.dir(eventEmit)

eventEmit.on('readed', (data) => {
    console.log('触发 readed 事件')
    console.log(data)
})

fs.readFile('./index.html', 'utf-8', (err, data) => {
    if (err) throw err;
    eventEmit.emit('readed', data)
    console.log('读取完成')
});*/

let eventEmit = new EventEmitter();
const eventList = {}

const $eventOn = function (type, cb) {
    if (!(type in eventList)) {
        eventList[type] = [];
    }
    eventList[type].push(cb);
}

const $eventOff = function (type, cb) {
    if (!(type in eventList)) {
        return false
    }
    if (!(Array.isArray(eventList[type])) || eventList[type].length === 0) {
        return false;
    }
    if (cb) {
        eventList[type].splice(eventList[type].indexOf(cb), 1);
        return type
    }
}

const $eventEmit = function (type, ...params) {
    console.log(params)
    if (type in eventList) {
        let arr = eventList[type];
        arr.map(cb => cb(...params))
    }
}

const eventFn = function (...args) {
    console.log(...args)
    console.log('读取完成')
    $eventOff('readed', eventFn);
    $eventEmit('readed', '再次触发');
};

$eventOn('readed', eventFn)

fs.readFile('./index.html', 'utf-8', (err, data) => {
    if (err) throw err;
    $eventEmit('readed', data);
});