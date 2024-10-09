const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const assert = require('http-assert');
const pagation = require('mongoose-sex-page');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");

const POPULATE_MAP = require('../plugins/POPULATE_MAP');
const POP_POST_MAP = require('../plugins/POP_POST_MAP');
const POP_GET_MAP = require('../plugins/POP_GET_MAP');
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP');

const User = require('../models/User');
const Article = require('../models/Article');
const Column = require('../models/Column');
const Comment = require('../models/Comment');
const Key = require('../models/Key');

// 创建资源
router.post(
    '/',
    /*(req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.send({
                data: {
                    status: 403,
                    msg: '没有 token'
                }
            })
        }

        jwt.verify(
            token,
            fs.readFileSync(path.join(process.cwd(), '/auth/public.cer'), 'utf8'),
            async (err, decoded) => {
                if (err) {
                    return res.send({
                        data: {
                            status: 401,
                            msg: 'token 失效'
                        }
                    })
                }
                try {
                    let result = await User.findById(decoded.userId);
                    if (!result) {
                        return res.send({
                            data: {
                                status: 401,
                                msg: '该用户不存在'
                            }
                        })
                    }
                    req._id = decoded.userId;
                    next()
                } catch (e) {
                    next(e)
                }
            }
        ).unless({
            path: ['']
        })
    },*/
    async (req, res, next) => {
    try {
        console.log('bus', req.body)
        const model = await req.Model.create(req.body);
        let modelName = req.Model.modelName;
        if (modelName in POP_POST_MAP) {
            let item = POP_POST_MAP[modelName];
            let { _refId, _model, queryAct, options } = item;
            let _id = model._id;
            let refId = req.body?.[_refId];
            assert(refId, 200, {
                code: 500,
                msg: `${ _refId }必填`
            })
            await _model[queryAct](refId, options(_id))
        }

        /*if (modelName === 'Comment') {
            let cid = model._id;
            let { aid } = req.body;
            await Article.findByIdAndUpdate(aid, {
                "$push": {
                    comments: cid
                }
            });
        }*/
        res.send(model)
    } catch (e) {
        console.log(e)
        next(createError(400))
    }
})

// 更新资源
// /api/rest/:resource/:id?queryString...
router.put(
    '/:id',
    /*(req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.send({
                data: {
                    status: 403,
                    msg: '没有 token'
                }
            })
        }

        jwt.verify(
            token,
            fs.readFileSync(path.join(process.cwd(), '/auth/public.cer'), 'utf8'),
            async (err, decoded) => {
                if (err) {
                    return res.send({
                        data: {
                            status: 401,
                            msg: 'token 失效'
                        }
                    })
                }
                try {
                    let result = await User.findById(decoded.userId);
                    if (!result) {
                        return res.send({
                            data: {
                                status: 401,
                                msg: '该用户不存在'
                            }
                        })
                    }
                    req._id = decoded.userId;
                    next()
                } catch (e) {
                    next(e)
                }
            }
        )
    },*/
    async (req, res, next) => {
        try {
            let putData = req.body;
            let modelName = req.Model.modelName;
            let id = req.params.id;
            let userId = req._id;
            const { revisable, authField } = POP_PUT_MAP[modelName];

            let isValidate = modelName in POP_PUT_MAP;
            assert(isValidate, 200, {
                code: 500,
                data: {
                    msg: `无权限修改${ modelName }`
                }
            })
            // 是否是该资源的所有者, 是才能修改
            let data = await req.Model.findById(id, authField);
            assert(data, 200, {
                code: 404,
                data: {
                    msg: '资源不存在'
                }
            })
            assert.equal(userId, data[authField].toString(), 200, {
                code: 400,
                data: {
                    msg: '无权修改'
                }
            })

            let updateData = Object.entries(putData).filter(([key, value]) => {
                return revisable.includes(key)
            })
            assert(updateData.length, 200, {
                code: 400,
                data: {
                    msg: '修改不存在的项'
                }
            })
            updateData = Object.fromEntries(updateData)
            updateData['date'] = new Date().toISOString();
            const result = await req.Model.findByIdAndUpdate(id, updateData);
            res.send(200, {
                code: 200,
                data: {
                    result,
                    msg: '修改成功'
                }
            })
        } catch (e) {
            next(e)
        }
    }
)

// 删除资源
router.delete('/:id', async (req, res) => {
    console.log(
        req.params.id
    )
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
        errMsg: 'ok'
    })
})

// 查询资源列表
router.get('/', async (req, res) => {
    const { options = {}, page = 1, size = 20, query = {} } = req.body;

    let result = await pagation(req.Model).find(query).select(options).size(size).page(page).display(8).exec();

    res.send(200, {
        code: 200,
        data: {
            result,
            msg: '查询成功'
        }
    })

    /**
     * setOptions
     *      new: bool-如果返回修改后的文档而不是原始文档, 则为 true, 默认 false
     *      upsert: bool-创建对象 (如果不存在). 默认为 false
     *      runValidators: 如果为 true, 则对此命令运行更新验证程序. 更新验证器根据模型的架构验证更新操作.
     *      sort: 如果条件找到多个文档, 请设置排序顺序以选择要更新的文档
     *      select: 设置要返回的文档字段
     *      rawResult: 如果为 true, 则返回 MongoDB 驱动程序的原始结果
     *      strict: 覆盖此更新的架构的严格模式选项
     */

    /*const queryOptions = req.body
    const items = await req.Model.find().setOptions(queryOptions);
    res.send(200, {
        message: 'ok',
        data: {
            count: items.length,
            list: items
        }
    });*/

    // let isMe = false;
    // assert(isMe, 422, '不是你, 错误访问')
})

// 查询资源详情
router.get('/:id', async (req, res) => {
    let modelName = req.Model.modelName;
    try {
        // req.Model.findById(req.params.id).populate('author', 'nickname avatar').populate('column', 'name');
        // let querys = req.Model.findById(req.params.id)
        /*if (modelName in POPULATE_MAP) {
            let populates = POPULATE_MAP[modelName];
            querys.populate(populates)
            for (let i = 0, item; item; item = populates[i++]) {
                querys = querys.populate(item['field'], item['select'])
            }
        }
        const result = await querys.exec()
        res.send(result);*/
        let _id = req.params.id
        let result = req.Model.findById(_id);
        // 查询资源详情
        if (modelName in POPULATE_MAP) {
            let populates = POPULATE_MAP[modelName];
            if (populates['path']) {
                result = result.populate(populates)
            }
            result = await result.exec();
            res.send(200, {
                code: 200,
                msg: '查询成功',
                result
            });
        }

        // 通过 ID 查看资源的联动操作
        if (modelName in POP_GET_MAP) {
            let { queryAct, options } = POP_GET_MAP[modelName];
            let result = await req.Model[queryAct](_id, options());
            res.send(result);
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = {
    busRoute: router
}

/**
 * 响应
 *
 * response
 *
 * 成功:
 *  GET: 200 OK
 *  POST: 201 Created
 *  Put: 200 OK
 *  PATCH: 200 OK
 *  DELETE: 204 No Content
 *
 * statusCode: 200
 * 获取数据列表 (多条)
 * {
 *     message: 'ok',
 *     data:{
 *         count: 返回条目数量,
 *         list: [
 *             // 请求列表
 *             {},
 *             {}
 *         ]
 *     }
 * }
 *
 * 获取数据列表 (单条)
 * {
 *     message: 'ok'
 *     data: {数据内容}
 * }
 *
 * 操作反馈 更新 添加
 * {
 *     message: '用户注册成功|数据更新成功|文章提交成功',
 *
 * }
 *
 *
 * 错误
 *  statusCode
 *  400: 请求参数错误, 请求路径错误
 *  401: jwt 验证未通过, 页面错误
 *  403: 无权访问 权限不够
 *  404: 访问资源不存在
 *  422: 用户不存在 密码错误 token 过期
 *
 *  {
 *      message: '响应错误文本'
 *  }
 */
