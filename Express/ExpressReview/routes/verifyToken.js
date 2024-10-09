const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        data: {
            status: 200,
            msg: 'token 正常'
        }
    })
})

module.exports = router;
