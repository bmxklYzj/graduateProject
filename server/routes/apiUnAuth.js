// const question = require('../controllers/question.js');
const image = require('../controllers/image.js');
const router = require('koa-router')();

image(router);

module.exports = router;

