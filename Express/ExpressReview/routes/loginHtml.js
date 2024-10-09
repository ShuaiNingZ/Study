const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('loginHtml', {
        useHbs: 'Express use hbs'
    })
})

module.exports = router;
