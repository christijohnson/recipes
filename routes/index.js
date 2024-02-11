const express = require('express');
const router = express.Router();

router
    .use('/', require('./swagger'))
    .use('/recipes', require('./recipes'))
    .use('/ingredients', require('./ingredients'));

    module.exports = router;