const bodyParser = require('body-parser');
const mongoose = require('mongoose')

mongoose.connect('mongodb://test:test@localhost:27017/todo')

// Schema : basically a blueprint!
const todoSchema = new mongoose.Schema({
    item: String
});

const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
// var data = [{item: 'Get up'}, {item: 'Have a shit'}, {item: 'Have a shower'}];

module.exports = (app)=>{

    app.get('/todo', (req, res)=>{
        Todo.find({}, (err, data)=>{
            if(err) throw err;
            res.render('todo', { todos: data });
        })
    })

    app.post('/todo', urlencodedParser, (req, res)=>{
        Todo(req.body).save((err, data)=>{
            if(err) throw err;
            res.json(data);
        })
    })

    app.delete('/todo/:item', (req, res)=>{
        Todo.find({ item: req.params.item.replace(/\-/g, ' ')}).remove((err, data)=>{
            if(err) throw err;
            res.json(data);
        })
    })
}