/**
 * javascript 单线程 非阻塞
 * 阻塞模式:
 * 如果某个任务很耗时, 比如设计很多 I/O (输入/输出) 操作, 那么线程的运行大概是下面这样:
 * 由于 I/O 操作很慢, 所以这个线程的
 * 大部分运行时间都在空等 I/O 操作的返回结果, 这种运行方式成为堵塞模式(blocking I/O)
 *
 * 读取文件 ==> 等待 File API... ==> 送出 HTTP 请求 ==> 等待网络响应 ==> SQL查询 ==> 等待数据库...
 *
 * 如果采用多线程, 同时运行多个任务, 那很可能就是下面这样:
 *
 */

/**
 * Node 任务队列方法
 * process.nextTick 和 setImmediate
 * process.nextTick 方法可以在当前 '执行栈' 的尾部... 下一次 Event Loop (主线程读取 '任务队列') 之前
 * ---触发回到函数, 也就是说, 他指定的任务总是发生在所有一部任务之前. setImmediate 方法则是在当前 '任务队列' 的
 * 尾部添加事件, 也就是说, 他指定的任务总是在下一次 Event Loop 时执行, 这与 setTimeout(fn, 0) 很像
 */
setTimeout(function () {
    console.log('timeout 1')
    process.nextTick(function () {
        console.log('next Tick1')
    })
    Promise.resolve().then(() => {
        console.log('Promise')
    })
})

setTimeout(function () {
    console.log('timeout 2')
    process.nextTick(function () {
        console.log('next Tick2')
    })
})

setTimeout(() => {
    console.log('宏任务', 1)
    setImmediate(() => {
        console.log(2)
    })
})

setTimeout(() => {
    console.log(3)
}, 0)

