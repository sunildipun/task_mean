var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
// var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        require:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required: true
        },
        token:{
            type:String,
            required:true
        }
    }],
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

UserSchema.methods.generateAuthTOken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access},abc123).toString();

    user.tokens.concat({access,token});

    user.save().then(() => {
        return token;
    });
}

var User = mongoose.model('User',UserSchema);

module.exports = {User}