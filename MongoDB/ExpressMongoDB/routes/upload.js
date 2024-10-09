const express = require('express');
const path = require('path');
const router = express.Router();
const assert = require('http-assert');
const multer = require('multer');
const fs = require("fs");
const createError = require('http-errors');
const { filesize } = require('../config')

/**
 * 所有文件上传前端都走单独接口, 单独事件
 *
 * 用户选择文件后 拖拽放入文件后 直接 http 上传接口
 *
 * 路由接口请求后 存储图片到 uploads 文件夹
 *
 * 接口 返回 此文件对应的 静态资源路径
 *
 * request query
 *      file: 文件
 *      uid: 用户 _id 如果 params.classIfy 是 user 必须给 uid
 */


const FILE_TYPE = {
    'user': 'user',
    'article': 'article'
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        let fileType = FILE_TYPE[req.params['classify'].trim()] ?? 'other';
        let filePath = path.join(__dirname, `../uploads/${ fileType }`);

        fs.existsSync(filePath) || fs.mkdirSync(filePath);

        cb(null, filePath);

        /*// req 中间件处理 请求时
        // file 上传的文件
        // cb 参数 this 指向, 存放文件的位置

        let userUid = req.params['uid'];
        let uploadPath = req.params['upath'];
        let uidPath = path.join(__dirname, `./uploads/${ fileType }`);
        console.log(userUid, uploadPath, uidPath);
        fs.existsSync(uidPath) || fs.mkdirSync(uidPath);
        uidPath = path.join(uidPath, `./${ uploadPath }`);
        fs.existsSync(uidPath) || fs.mkdirSync(uidPath)
        cb(null, uidPath);*/
    },
    filename(req, file, cb) {
        // req 请求, 中间件带过来的 request 对象
        // file 上传的问题进啊对象
        // cb 参数 this 指向, 文件存储名
        let { ext, name } = path.parse(file.originalname);
        cb(null, `${ name }_${ Date.now() }${ ext }`);
    }
});

const upload = multer({
    storage,
    // limits: {
    //     fileSize: filesize
    // }
});

router.post('/:classify', upload.single('file'), (req, res, next) => {
    // 过滤 fileType 只容许 FILE_TYPE 中存在的文件分类
    try {
        let fileType = FILE_TYPE[req.params['classify']] ?? '';
        assert(fileType, 200, {
            code: 500,
            msg: '文件上传分类不正确'
        })

        let { uid } = req.body;
        if (fileType === 'user') {
            assert(uid, 200, {
                code: 500,
                msg: '用户头像必须指定 UID'
            })
        }
        console.log(req.file)
        let { destination, filename } = req.file;
        res.send(200, {
            code: 200,
            data: {
                src: `http://${ path.join('127.0.0.1:3000', path.parse(destination).name, filename).replace(/\\/g, '/') }`,
                msg: '上传成功'
            }
        })
    } catch (err) {
        next(err)
    }
})

/*router.get('/', async (req, res) => {
    // let pubKey = fs.readFileSync(path.join(process.cwd(), '/auth/public.cer'), 'utf8');
    let pubKey = await Key.findOne().select('content');
    res.send(200, {
        code: 200,
        data: {
            pubKey,
            msg: '查询成功'
        }
    })
})*/

module.exports = router;
