var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var revisionSchema = new Schema({
    revisionId : String,
    taskId: String,
    image: String,
    description: String,
    submittedBy: String,
    submittedOn: Date,
});

module.exports = mongoose.model('Revision', revisionSchema);