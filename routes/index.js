const express = require('express');
const router = express.Router();

router
    .use('/', require('./swagger'))
    .use('/recipes', require('./recipes'));

    module.exports = router;