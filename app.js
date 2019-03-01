const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

app.set('view engine', 'ejs');
app.use('/', express.static('./public'));

app.listen(3000);
console.log('Listening on port 3000');

todoController(app);