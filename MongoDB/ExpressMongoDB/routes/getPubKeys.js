const express = require('express');
const path = require('path');
const router = express.Router();
const Key = require('../models/Key');
const assert = require('http-assert');

router.get('/', async (req, res) => {
    // let pubKey = fs.readFileSync(path.join(process.cwd(), '/auth/public.cer'), 'utf8');
    let pubKey = await Key.findOne().select('content');
    res.send(200, {
        code: 200,
        data: {
            pubKey,
            msg: '查询成功'
        }
    })
})

module.exports = router;
