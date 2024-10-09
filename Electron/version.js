// 安装 iohook 的时候注意 node 版本信息 不要出错
// 该文件在当前文件夹下使用 PowerShell 输入 node version 执行 输出版本
const nodeAbi = require("node-abi");

// 获取当前项目的版本信息
const nodeAbiV = nodeAbi.getAbi("14.21.3", "node");
const electronAbiV = nodeAbi.getAbi("20.2.0", "electron");

const nodeVersion = nodeAbi.getTarget("83", "node");
const electronVersion = nodeAbi.getTarget("87", "electron");

console.log("nodeVersion ==========>", nodeVersion);
//
console.log("electronVersion ==========>", electronVersion);
//
console.log("nodeAbiV ==========>", nodeAbiV);
// 83
// 此处的版本 对应 package.json iohook.targets[0] 的版本号
console.log("electronAbiV ==========>", electronAbiV);
// 107
// 同上
