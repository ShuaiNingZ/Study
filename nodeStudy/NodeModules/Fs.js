const fs = require('fs');
const path = require('path');

// 读取图片 base64 格式得到数据后一定要加上 base64 图片头使用 data:image/jpg;base64,
// fs.readFile('./images/1.jpg', 'base64', (err, data) => {
//     console.log(`data:image/jpg;base64,${data}`)
// })

// 打开文件 不是读取, 也不是写入, 就是单纯打开文件 fd 是文件标识 ID
// fs.open('./doc.md', 'r+', 0o600, function (err, fd) {
//     console.log(fd)
//     // 声明缓存区 分配了12位 1个汉字 占3位
//     let buf = Buffer.from('你好, 世界');
//     fs.read(fd, buf, 0, buf.length, 0, function (err, bytesRead, buffer) {
//         if (err) {
//             throw err;
//         }
//         console.log(bytesRead)
//         console.log(buffer === buf)
//         console.log(buf.toString());
//     })
// })

// 写入文件 先打开 再 write 准备好写入内容的 Buffer
fs.open('./doc.md', 'a+', 0o600, function (err, fd) {
    console.log(fd)
    // 声明缓存区 分配了12位 1个汉字 占3位
    let buf = Buffer.from('你好, 世界');
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {
        if (err) {
            throw err;
        }
        console.log(written)
        console.log(buffer.toString('utf8'));

        // 同步磁盘缓存 对文件改动操作之后 关闭文件之前, 一定要同步缓存
        fs.fsync(fd, err => {
            if (err) {
                throw err;
            }
            console.log('同步完成');
            fs.close(fd, err => {
                if (err) {
                    throw err
                }
                console.log('文件关闭')
            })
        });
    })
})














