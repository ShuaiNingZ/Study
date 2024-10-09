// fs 文件系统
// 所有文件系统操作都具有同步、回调和基于 promise 的形式, 并且可以使用 CommonJS 语法和 ES6 模块进行访问
// Promise 示例: fsPromises.readdir
/* const {readdir} = require('fs/promises');
(async function (path) {
    try {
        const res = await readdir(path);
        console.log(res)
    } catch (err) {
        throw err;
    }
})(__dirname);  // ['fsModule.js']
// 回调函数 示例: fs.readdir
const {readdir} = require('fs');
readdir(__dirname, (err, buffer) => {
    if (err) throw err;
    console.log(buffer)
})  // ['fsModule.js']
// 同步 示例: fs.readdirSync
const {readdirSync} = require('fs');
const dir = readdirSync(__dirname);
console.log(dir); // ['fsModule.js'] */

const fs = require("fs");

/*// 删除文件, 此删除文件只是将电脑文件删除到回收站并清除了回收站的引用路径, 文件可修复
fs.unlink(`${__dirname}/txt`, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('删除成功')
    }
})*/

/*// 重命名文件/移动路径
// 当目标文件和修改后的文件路径在同一文件夹下, 则为重命名
// 当目标文件和修改后的文件路径不在同一文件夹下且名字一样, 则为文件移动
// 当目标文件和修改后的文件路径不在同一文件夹下且名字不一样, 则为文件移动并重命名
fs.rename(
	`${__dirname}/text.txt`,
	`${__dirname}/src/demo.txt`,
	(err) => {
		if (err) {
			console.log(err)
		} else {
			console.log('重命名成功')
		}
	}
)*/

/*
// 分段读取数据
let input = fs.createReadStream('text.txt');

function readLines(input, func) {
	let remainling = ''; // 剩余信息
	let count = 0;
	input.on('data', data => {
		remainling += data;
		let endIndex = remainling.indexOf('\n');
		let startIndex = 0; // 起始位置
		/!*do {
			let line = remainling.substring(startIndex, endIndex);
			startIndex = endIndex; // 移动起始位置
			func(line, count);
			count++;
			endIndex = remainling.indexOf('\n', startIndex);
		} while (count < 2);*!/
		while (endIndex > -1) {
			let line = remainling.substring(startIndex, endIndex);
			startIndex = endIndex + 1; // 移动起始位置
			func(line, count);
			count++;
			endIndex = remainling.indexOf('\n', startIndex);
		}
		remainling = remainling.substring(startIndex);
	})
	input.on('end', function () {
		if (remainling.length > 0) {
			func(remainling, count);
		}
	})
}

function func(data, count) {
	console.log(`第${count}行: ${data}`)
}

readLines(input, func)
*/

// 写入流
/*
fs.writeFileSync(`${__dirname}/`)
let output = fs.createWriteStream(
	`${__dirname}/text.txt`,
	{
		encoding: 'utf8'
	}
)
output.write('不秋草');
output.end();
*/
// 方式一: 复制内容是将所有数据放到内存,
// 然后从内存中重新写出来的, 十分消耗内存
/*fs.writeFileSync(
	`${__dirname}/video.mp4`,
	fs.readFileSync(`${__dirname}/video/video.mp4`)
)*/
// 方式二: 流式读取, 流式写入
/* let readStream = fs.createReadStream(`${__dirname}/video/video.mp4`);
let writeStream = fs.createWriteStream(`${__dirname}/video.mp4`);
readStream.on("data", function (data) {
    writeStream.write(data, function () {});
});
readStream.on("end", function (data) {
    writeStream.end();
});
 */

/* const stream = require("stream");
console.log(stream); */

// const zlib = require("zlib");
/* // 压缩
fs.createReadStream(`${__dirname}/text.txt`)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(`${__dirname}/text.zip`)); */
/* // 解压
fs.createReadStream(`${__dirname}/text.zip`)
    .pipe(zlib.createUnzip())
    .pipe(fs.createWriteStream(`${__dirname}/text1.txt`)); */

const crypto = require("crypto");
// console.log(crypto);
let algsArr = crypto.getHashes();
algsArr.forEach((name) => {
    hashTest(name, `${__dirname}/video/video.mp4`);
});

function hashTest(algs, filePath) {
    let startTime = new Date(); // 算法开始测试时间
    let mp4Stream = fs.createReadStream(filePath);
    let hashStream = crypto.createHash(algs);
    mp4Stream.on("data", (chunk) => {
        hashStream.update(chunk);
    });
    mp4Stream.on("end", (chunk) => {
        let endTime = new Date(); // 结束时间
        console.log(`${algs}算法花费的时间是: ${endTime - startTime}`);
    });
}
