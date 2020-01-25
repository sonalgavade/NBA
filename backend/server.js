var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var routes = require('./app/routes.js');//1

//connecting to db
mongoose.connect('mongodb://localhost/nbaPlayers',  { useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err) throw err;
    console.log("Connection successfull!");
} );

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/', routes);//2 from here it will go to routes.js

//interchange these lines n it wont work first require then use
//It just means that require('./app/routes.js') returns a function. 
//You can then call this function with another set of parantheses.
//It's basically the same as:
// var func = require('./app/routes.js');
// func(app);
// require('./app/routes.js')(app);//3



app.listen(3000, function(){
    console.log('Server started on port 3000');
});        

module.exports = app;


