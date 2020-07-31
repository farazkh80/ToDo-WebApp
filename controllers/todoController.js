
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database (use mangoDB Atlas website to connect)
mongoose.connect('mongodb+srv://faraz:test@cluster0.x9xes.mongodb.net/cluster0?retryWrites=true&w=majority');


//create a schema
var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: "get food"}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});


var data = [{item:'get milk'}, {item:'walk dog'}, {item:'kick some coding ass'} ];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  res.render('todo');
});

app.post('/todo', function(req, res){

});

app.delete('/todo', function(req, res){

});


};
