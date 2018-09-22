var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    address: String,
    number: Number,
    role: {type: String ,enum: [ "Admin", "General"]}
});

module.exports = mongoose.model('User', userSchema);