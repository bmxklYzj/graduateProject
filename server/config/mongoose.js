var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bishe');
var db = mongoose.connection;
db.on('error', function (err) {
    console.log(err);
});

module.exports = mongoose;