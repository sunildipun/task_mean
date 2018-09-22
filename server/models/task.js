var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var Task = mongoose.model('Task', {
    
    name: {
        type:String,
    },
    description:{
        type: String,
    },
    image: {
        type: String,
        default:null,
    },
    createdBy: {
        type: String,
    },
    createdOn:{
        type: Date,
        default: new Date().getTime()
    },
    assignedTo: {
        type: String,
    }
});

module.exports = {Task};