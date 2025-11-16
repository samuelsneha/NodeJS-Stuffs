const express = require('express');
const app = express();
const home = require('./routes/homePage');
const books = require('./routes/books'); 
const generes = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to mongodb...'))

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', home);
app.use('/api/books', books);
app.use('/api/generes', generes);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

console.log(process.env.PORT);

const port = process.env.PORT === undefined ? 3000 : process.env.PORT;
app.listen(port, ()=> {console.log(`listening on port ${port}`)}); 
