var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var mongoose = require('mongoose');
var user = require('./models/user');
var {Task} = require('./models/task');
var revision = require('./models/revision');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;
// var router = express.Router();

mongoose.connect('mongodb://localhost:27017/taskManagement');


// Creating Task 

app.post('/tasks',function (req, res) {
    // console.log(req.body);
    
    var taskNew = new Task({
        name : req.body.name,
        description : req.body.description,
        image : req.body.image,
        createdBy : req.body.createdBy,
        createdOn : req.body.createdOn,
        assignedTo : req.body.assignedTo,
    });
    taskNew.save().then((doc) => {
        res.send(doc)
    },(e) => {
        res.status(400).send(e);
    });

    // taskNew.name = req.body.name;
    // taskNew.description = req.body.description;
    // taskNew.image = req.body.image;
    // taskNew.createdBy = req.body.createdBy;
    // taskNew.createdOn = req.body.createdOn;
    // taskNew.assignedTo = req.body.assignedTo;
    
    // taskNew.save(function (err) {
    //     if (err) {
    //         res.send(err);
    //     }
    //     console.log("added");
    //     res.send({ message: 'Task Created !' })
    // })
});

// app.use(cors());
// app.use('/api', router);
app.listen(port, ()=>{
    console.log('Task Management is runnning at ' + port);
});