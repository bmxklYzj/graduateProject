// const question = require('../controllers/question.js');
const admin = require('../controllers/admin.js');
const router = require('koa-router')();

admin(router);

module.exports = router;

