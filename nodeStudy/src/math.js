const path = require("path");

module.exports = {
    p() {
        // 输出该代码 所在文件的文件夹路径
        // 并非在哪里执行, 输出哪个文件的路径
        console.log(__dirname);
        return __dirname
    }
}