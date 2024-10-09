const fs = require('fs');
const path = require('path');

/**
 * 执行脚本的时候
 *      读取脚本目录的同级 js 文件, 给每个 js 文件添加 head 注释头模板如上
 */

fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    if (files.length) {
        files.forEach(item => {
            const ext = path.extname(item);
            if (ext === '.js' && fs.statSync(item).isFile() && item !== path.basename(__filename)) {
                fs.writeFile(
                    path.join(__dirname, item),
                    `/**
                      * from ${item}
                      * reated by me on ${Date.now()}
                      */
                    `,
                    (err) => {
                        if (err) throw err;
                    }
                )
            }
        })
    }
})