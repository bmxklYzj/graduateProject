var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bishe2');
var db = mongoose.connection;
db.on('error', function (err) {
    console.log(err);
});

module.exports = mongoose;