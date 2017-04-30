const question = require('../controllers/question.js');
const router = require('koa-router')();

question(router);

module.exports = router;

