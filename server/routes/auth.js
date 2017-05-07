// const question = require('../controllers/question.js');
const auth = require('../controllers/auth.js');
const router = require('koa-router')();

auth(router);

module.exports = router;

