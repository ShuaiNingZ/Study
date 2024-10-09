const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const assert = require('http-assert');

/**
 * 文章搜索 search API
 *
 * title content
 *
 * http://127.0.0.1:3000/search?q=你好
 */
router.get('/', async (req, res, next) => {
    let { q = '' } = req.query;
    let regExp = new RegExp(q, 'i');
    try {
        const result = await Article.find({
            $or: [
                {
                    title: {
                        $regex: regExp
                    }
                },
                {
                    content: {
                        $regex: regExp
                    }
                }
            ]
        })

        res.send(200, {
            code: 200,
            data: {
                msg: '查询成功',
                result
            }
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router;
