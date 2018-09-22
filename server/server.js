var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var {ObjectID} = require('mongodb');

var app = express();

var mongoose = require('mongoose');
var {User} = require('./models/user');
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


app.get('/tasks',(req, res)=>{
    Task.find().then((tasks)=>{
        res.send({tasks});
    },(e)=>{
        res.status(400).send(e);
    })
})

// GET Task/id
app.get('/tasks/:id',(req, res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    } 

    Task.findById(id).then((task)=>{
        console.log(task)
        if(!task) {
            return res.status(404).send();
        }

        res.send({task});

    }).catch((e)=>{
        res.status(400).send(e);
    })

    
    // res.send(req.params);
})



//  User Post
app.post('/user',(req, res)=>{
    console.log('User', req.body);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        role: req.body.role,
    });

    user.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
})
// app.use(cors());
// app.use('/api', router);
app.listen(port, ()=>{
    console.log('Task Management is runnning at ' + port);
});