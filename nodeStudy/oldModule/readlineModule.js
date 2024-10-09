// readline 模块: 用于从 可读流 读取数据, 每次读取一行.
const readline = require("readline");

// readline .Interface 类的实例是使用 readline.createInterface 方法创建的.
// 每个实例都关联一个 input 可读流 和 一个 output 可写流.
// output 流 用于为用户输入打印提示和从 input 流读取.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// SIGCONT 事件
// 当一个 Node.js 进程使用 ctrl + z (也就是 SIGTSTP) 移入后台之后在使用 fg(1p) 移回前台时, 触发 SIGCONT 事件.
// 如果 input 流在 SIGTSTP 请求之前被暂停, 则事件不会被触发.
// 注意: Windows 系统不支持 SIGCONT 事件.
rl.on("SIGCONT", () => {
    // `prompt` 会自动恢复流
    rl.prompt();
});

// SIGINT 事件
// 每当 input 流接收到一个 ctrl + c 输入 (通常被称为 SIGINT) 时, 触发 SIGINT 事件.
// 当 input 流接收到一个 SIGINT 时, 如果没有注册 SIGINT 事件, 则 pause 事件会被出发.
rl.on("SIGINT", () => {
    rl.question("确定要退出吗?(y/n)", (answer) => {
        if (answer.match(/^y(es)?$/i)) rl.pause();
    });
});

// SIGTSTP 事件
// 每当 input 流接收到一个 ctrl + z 输入 (通常被称为 SIGTSTP) 时, 触发 SIGTSTP 事件.
// 当 input 流接收到一个 SIGTSTP 时, 如果没有注册 SIGTSTP 事件监听器, 则 Node.js 进程会被发送到后台.
// 当程序使用 fg(1p) 恢复时, pause 和 SIGCONT 事件会被触发. 可以用来恢复 input 流.
// 如果 input 流在进程被发送到后台之前被暂停, 则 pause 和 SIGCONT 事件不会被触发.
// 注意: Windows 系统不支持 SIGTSTP 事件.
rl.on("SIGTSTP", () => {
    // 这会重写 SIGTSTP，且防止程序进入后台。
    console.log("捕获 SIGTSTP。");
});

// close 事件
// rl.close() 方法被调用, readline.Interface 实例放弃了对 input 和 output 流的控制.
// input 流接收到 'end' 事件.
// input 流接收 ctrl + D 以发出传输结束 (EOT) 的信号.
// input 流接收到 SIGINT 的 ctrl + c, 且 readline.Interface 实例上没有注册 SIGINT 事件监听器.
// 以上几种情况都会触发 close 事件.
// close 事件触发时, readline.Interface 实例结束.

// input 流 (用户输入内容)
// line 事件, 当 input 流接收到 换行符 时触发.
rl.on("line", (input) => {
    console.log(`Readline line 接收到: ${input}`);
});

// history 事件
// 每当历史数组发生更改时, 则会触发 history 事件
// 使用包含历史数组的数组调用监听器函数. 它将反映由于 historySize 和 removeHistoryDuplicates 引起的所有更改、添加和删除的行.
// 主要目的是允许监听器保留历史记录. 监听器也可以更改历史对象. 这可能有助于防止将某些行添加到历史记录中.
rl.on("history", (history) => {
    console.log(`Readline history 接收到: ${history}`);
});

// pause 事件
// input 流 被暂停.
// input 流 不是暂停的, 且接收到 SIGCONT 事件.
rl.on("pause", () => {
    console.log("Readline pause 被暂停");
});

// resume 事件
// 每当 input 流被恢复时触发 resume 事件.
rl.on("resume", () => {
    console.log("Readline resume 被恢复");
});

// rl.close()
// rl.close() 方法关闭 readline.Interface 实例并放弃对 input 和 output 流的控制. 当调用时, 触发 close 事件
// 调用 rl.close() 不会立即阻止其他由 readline.Interface 实例触发的事件 (包括 line).

// rl.pause()
// rl.pause() 方法暂停 input 流, 允许它稍后在必要时恢复.
// 调用 rl.pause() 不会立即暂停其他由 readline.Interface 实例触发的事件 (包括 line)

// rl.resume()
// 如果 input 流已暂停, 则 rl.resume() 方法会恢复该流.

// rl.prompt([preserveCursor])
// preserveCursor <boolean> 如果为 true, 则防止光标位置重置为 0
// rl.prompt() 方法将配置为 prompt 的 readline.Interface 实例写入 output 中的新行, 以便为用户提供用于提供输入的新位置.
// 当调用时, 如果 rl.prompt() 流已暂停, 则 rl.prompt() 将恢复 input 流.
// 如果 readline.Interface 是在 output 设置为 null 或 undefined 的情况下创建的, 则不会写入提示.

// rl.getPrompt()
// 返回 <string> 当前提示的字符串
// rl.getPrompt() 方法返回 rl.prompt() 使用的当前提示

// rl.setPrompt(prompt)
// prompt <string>
// rl.setPrompt() 方法设置了在调用 rl.prompt() 时将写入 output 的提示

// rl.question(query[, options], callback)
// query <string> 要写入 output 的语句或查询, 位于提示之前
// options <Object>  signal <AbortSignal> 可选择允许使用 AbortController 取消 question().
// callback <Function> 使用用户输入调用的回调函数以响应 query.
// rl.question() 方法通过将 query 写入 output 来显示 query, 等待在 input 上提供用户输入, 然后调用 callback 函数, 将提供的输入作为第一个参数传入.
// 当调用时, 如果 rl.question() 流已暂停, 则 rl.question() 将恢复 input 流.
// 如果 reqdline.Interface 是在 output 设置为 null 或 undefined 的情况下创建的, 则不会写入 query.
// 传给 rl.question() 的 callback 函数不遵循接受 Error 对象或 null 作为第一个参数的典型模式. 以提供的答案作为唯一参数调用 callback.
rl.question("请输入你的问题: ", (answer) => {
    console.log(`多谢你的反馈：${answer}`);
});

// rl.write(data[, key])
// data <string>
// key <Object>
//      ctrl <boolean> true 标识 Ctrl 键
//      meta <boolean> true 标识 Meta 键
//      shift <boolean> true 标识 Shift 键
//      name <string> 键的名称
// rl.write() 方法会将 data 或由 key 标识的键序列写入 output. 仅当 output 是 TTY 文本终端时餐支持 key 参数.
// 如果制定了 key, 则忽略 data.
// 当调用时, 如果 rl.write() 流已暂停, 则 rl.write() 将恢复 input 流.
// 如果 readline.Interface 是在 output 设置为 null 或 undefined 的情况下创建的, 则不会写入 data 和 key.
rl.write("Delete this!");
rl.write(null, { ctrl: true, name: "u" });

// rl[Symbol.asyncIterator]()
// 返回 <AsyncIterator>
// 创建 AsyncIterator 对象, 该对象便利输入流中的每一行作为字符串. 此方法允许通过 for await...of 循环异步迭代 readline.Interface 对象.
// 输入流中的错误不会被转发.
// 如果循环以 break、throw 或 return 终止, 则将调用 rl.close(). 也就是 迭代 readline.Interface 将始终完全消费输入流.
// 性能无法与创痛的 line 事件 API 相提并论,  对于性能敏感的应用程序，请改用 line.
// readline.createInterface() 将在调用后开始使用输入流. 在接口创建和异步迭代之间进行异步操作可能会导致丢失行.

// rl.line
// 节点正在处理的当前输入数据.
// 这可用于从 TTY 流中收集输入以检索迄今为止 (在 line 事件触发之前) 已处理的当前值, 一旦触发 line 事件, 则此属性将是空字符串.
// 请注意, 如果 rl.cursor 也不受控制, 则在实例运行时修改该值可能会产生意想不到的后果.
// 如果不使用 TTY 流进行输入, 则使用 line 事件
