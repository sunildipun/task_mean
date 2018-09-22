var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var User = mongoose.model('User',{
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type:String,
    },
    number: {
        type: Number,
    },
    role: {
        type: String ,enum: [ "Admin", "General"]
    }
});

module.exports = {User};