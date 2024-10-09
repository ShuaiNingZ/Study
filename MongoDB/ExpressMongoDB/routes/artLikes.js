const express = require('express');
const router = express.Router();
const Article = require('../models/Article')

/**
 * post 文章点赞
 */
router.post('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await Article.findByIdAndUpdate(id, {
            $inc: {
                likes_num: 1
            }
        })
        let likes = ++result.likes_num;
        res.send(200, {
            code: 200,
            data: {
                likes,
                msg: '点赞成功'
            }
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router;
