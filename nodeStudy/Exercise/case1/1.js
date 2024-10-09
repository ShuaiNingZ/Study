/**
 * 小红=99 小白=100 小黄=70 小黑=66 小绿=88
 * 转为
 * 小红: 99
 * 小白: 100
 * 小黄: 70
 * 小黑: 66
 * 小绿: 88
 */

const {
    readFile
} = require('fs').promises;
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './1.txt');

async function changeFile() {
    try {
        const controller = new AbortController();
        const {signal} = controller;
        const fileCont = await readFile(
            filePath,
            {
                encoding: 'utf8',
                signal
            }
        )
        controller.abort();
        const result = fileCont.replace(/=/g, ':').replace(/\s/g, '\n');
        fs.writeFile(filePath, result, 'utf8', (err) => {
            if (err) throw err; // 处理错误情况
            console.log("文件已成功写入");
        });
    } catch (err) {
        console.error(err)
    }
}

changeFile();
