// const question = require('../controllers/question.js');
const noAuth = require('../controllers/noAuth');
const router = require('koa-router')();

noAuth.noAuth(router);

module.exports = router;

