const Events = require("nodeStudy/oldModule/events");
let myEmitter = new Events();
console.log(myEmitter);
let fn = () => {
    console.log("你好世界");
};
let fn1 = () => {
    console.log("你好世界1");
};
let fn2 = () => {
    console.log("你好世界2");
};
let fn3 = () => {
    console.log("你好世界3");
};
let fn4 = () => {
    console.log("你好世界4");
};
myEmitter.on("played", fn);
myEmitter.on("played", fn1);
myEmitter.on("played", fn2);
myEmitter.on("played", fn3);
myEmitter.on("played", fn4);

function f() {
    console.log("开始");
    myEmitter.emit("played");
    myEmitter.removeListener("played", fn);
    console.log("结束");
}

f();

console.log(myEmitter.listeners("played"));
