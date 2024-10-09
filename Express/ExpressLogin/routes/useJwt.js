const express = require('express');
const router = express.Router();

router.post('/', async function (req, res, next) {
    if (!req.tokenID) {
        res.send(200, {
            statusCode: 401,
            errMsg: '没有访问权限'
        })
        return
    }
    res.send(200, {
        statusCode: 200,
        errMsg: 'welcome'
    })
})

module.exports = router;
