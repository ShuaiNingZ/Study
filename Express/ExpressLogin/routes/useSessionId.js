const express = require('express');
const router = express.Router();

router.post('/', async function (req, res, next) {
    console.log('req.session.sid', req.session.sid)
    if (!req.session.sid) {
        res.send(200, {
            statusCode: 403,
            errMsg: '没有访问权限'
        })
        return
    }
    res.send(200, {
        statusCode: 200,
        errMsg: 'useSessionId'
    })
})

module.exports = router;
