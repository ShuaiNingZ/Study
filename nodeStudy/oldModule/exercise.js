const fs = require("fs");
const axios = require("axios");
const readline = require("readline");
const jsdom = require("jsdom");

// 创建 逐行读取 实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 监听输入
rl.question("请输入想要的壁纸名称: ", async (answer) => {
    console.log(`想要 ${answer} 壁纸`);
    let res = await axios({
        method: "GET",
        /* url: `http://wallpaper.apc.360.cn/index.php?c=WallPaper&start=0&count=12&a=search&kw=${encodeURIComponent(
            answer
        )}` */
        url: `https://www.3gbizhi.com/tag/dongman/4.html`
    });
    let dom = new jsdom.JSDOM(res.data);
    [...dom.window.document.querySelectorAll(".cl li oldimg")].forEach((item) => {
        console.log(item.src);
    });
    rl.close();
});
