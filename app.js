const express = require('express')
const app = express()
const mongoose = require('mongoose')

Genre = require('./models/genre')
Book = require('./models/book')

app.use(express.json({extended: false}))

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
    .then(() => console.log("Successfully connected"))
    .catch((err) => console.log("Couldn't connect \n"+err))



//Home
app.get('/', (req,res) => {
    res.send("Use api/ endpoint along with genres or books")
})

//Genre Routes
app.get('/api/genres', (req,res) => {
    Genre.getGenres((err, genres) => {
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

app.post('/api/genres', (req,res) => {
    const genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

app.put('/api/genres/:_id', (req,res) => {
    const id = req.params._id;
    const genre = req.body;
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

app.delete('/api/genres/:_id', (req,res) => {
    const id = req.params._id;
    Genre.removeGenre(id, (err, genre) => {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});




//Book Routes
app.get('/api/books', (req,res) => {
    Book.getBooks((err, books) => {
        if(err){
            throw err;
        }
        res.json(books);
    });
});

app.get('/api/books/:_id', (req,res) => {
    Book.getBookById(req.params._id, (err, book) => {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.post('/api/books', (req,res) => {
    const book = req.body;
    Book.addBook(book, (err, book) => {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.put('/api/books/:_id', (req,res) => {
    const id = req.params._id;
    const book = req.body;
    Book.updateBook(id, book, {}, (err, book) => {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.delete('/api/books/:_id', (req,res) => {
    const id = req.params._id;
    Book.removeBook(id, (err, book) => {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.listen(3000, () => console.log("Running on port 3000"))