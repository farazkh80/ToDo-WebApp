
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database (use mangoDB Atlas website to connect)
mongoose.connect('mongodb+srv://faraz:test@cluster0.x9xes.mongodb.net/cluster0?retryWrites=true&w=majority');


//create a schema
var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item:'get milk'}, {item:'walk dog'}, {item:'kick some coding ass'} ];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  //get data from mongodb and pass it to the view

  //specify the model
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
  });

});

app.post('/todo', urlencodedParser , function(req, res){


  //get data from the view and add it to the database

  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;

    res.json(data);
  });
});

app.delete('/todo/:item', function (req, res) {
    //delete the requested item from mongodb
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});


};
