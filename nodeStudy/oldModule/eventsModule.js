/**
 * 事件驱动 通过有效方法来监听事件状态的变化, 并在发生变化时做出相应的动作
 * 事件模型 NodeJS 的事件架构采用经典的 -- 订阅发布模式
 * 订阅发布模式 也称为消息机制, 定义了一种依赖关系, 这种依赖管理可以理解为 1 对 N 观察者们,
 * 同时监听某一个对象相应的状态变化, 一旦变化则通知到所有观察者, 从而触发观察者注册的相应事件, 该设计模式解决了主题对象与观察者之间功能的耦合
 * Events 模块 在 node 中大部分的模块实现都继承了 Events 类, 它提供了一个对象 events.EventEmitter, EventEmitter 的核心是事件发射与事件监听
 *
 * 注册监听事件
 * eventEmitter.on(eventName, callback)
 * eventName 事件名
 * callback 事件触发后的回调函数
 *
 * 注册只能调用一次的监听事件
 * eventEmitter.once(eventName, callback)
 * eventName 事件名
 * callback 事件触发后的回调函数
 *
 * 触发指定的监听事件
 * eventEmitter.emit(eventName[, ...args])
 * eventName 事件名
 * args 可选参数, 按顺序传入回调函数的参数
 *
 * 移除指定事件的监听器, 注意: 该监听器必须是注册过的, 否则无效
 * eventEmitter.removeListener(eventName, callback)
 * eventName 事件名
 * callback 事件触发后的回调函数
 *
 * 移除所有监听器, 一个事件可以有多个监听, 需要全部移除时, 可以用此方法
 * eventEmitter.removeAllListeners(eventName)
 * eventName 需要全部移除的事件名, 如果不传参数, 将会移除所有监听事件
 *
 * 返回名为 eventName 的事件的监听器绑定回调函数数组的副本
 * eventEmitter.listeners(eventName)
 *
 * 返回列出触发器已为其注册监听器的事件的数组
 * eventEmitter.eventNames()
 *
 * 默认情况下, 如果为特定事件添加了 10 个以上的监听器, 则 EventEmitter 将打印警告
 * eventEmitter.setMaxListeners(n)
 * 该方法允许修改特定的 EventEmitter 实例的限制, 该值可以设置为 Infinity 或 0 以指示无线数量的监听器
 *
 * 同步异步问题
 * EventEmitter 会按照注册的顺序 同步 的调用所有监听器, 这确保了事件的正确排序, 并有助于避免竞争条件和逻辑错误
 *
 * 当 EventEmitter 实例中发生错误, 典型的操作是触发 'error' 事件, 这在 NodeJS 被视为特殊情况
 * 如果 EventEmitter 没有为 'error' 事件注册至少一个监听器, 并且触发 'error' 事件, 则会抛出错误, 打印堆栈跟踪, 然后退出 NodeJS 进程
 *
 * Events 模块默认支持两个事件:
 * newListener 事件: 添加新的回调函数时触发
 * removeListener 事件: 移除回调时触发
 */
const { EventEmitter } = require("nodeStudy/oldModule/events");
class MyEmiter extends EventEmitter {}
const myEmitter = new MyEmiter();
myEmitter.on("newListener", (evtName) => {
    console.log("New Listener:" + evtName);
});
myEmitter.on("removeListener", (evtName) => {
    console.log("Removed Listener:" + evtName);
});
myEmitter.on("hello", () => {
    console.log("hello world");
});
myEmitter.emit("hello");

myEmitter.on("error", (e) => {
    console.log(e);
});
myEmitter.emit("error", new Error("an error happen"));

console.log(myEmitter.listeners("hello"));
console.log(myEmitter.eventNames());
