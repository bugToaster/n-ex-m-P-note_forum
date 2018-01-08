var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Genre = require('./model/genres');
Books = require('./model/book');
app.use(bodyParser.json());

//Contact to Mongoose
mongoose.connect('mongodb://localhost/bookstore', { useMongoClient: true });
 var db = mongoose.connection;

app.get('/',function(req,res){
    res.send('Hello World');
});

app.get('/api/genres',function(req,res){
    Genre.getGenres(function(err,genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

app.get('/api/books',function(req,res){
    Books.getBooks(function(err,books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

app.get('/api/books/:id',function(req,res){
    Books.getBooksByID(req.params.id, function(err,books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

app.post('/api/genres_create', function(req, res){
    var genre =  req.body;
    Genre.addGenre(genre, function(err,genre){
        if(err){
            throw err;
        }
        res.json(genre);
    })
});

app.post('/api/book_create', function(req, res){
    var book =  req.body;
    Books.addBook(book, function(err,book){
        if(err){
            throw err;
        }
        res.json(book);
    })
});

app.post('/api/genre_update/:_id', function(req, res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err,genre){
        if(err){
            throw err;
        }
        res.json(genre);
    })
});

app.post('/api/book_update/:_id', function(req, res){
    var id = req.params._id;
    var book = req.body;
    Books.updateBook(id, book, {}, function(err,book){
        if(err){
            throw err;
        }
        res.json(book);
    })
});


app.delete('/api/genre_delete/:_id', function(req, res){
    var id = req.params._id;
    Genre.deleteGenre(id, function(err,genre){
        if(err){
            throw err;
        }
        res.json(genre);
    })
});

app.listen(3000);
console.log('console App running.........');