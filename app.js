const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect("mongodb://note:note123456@ds149763.mlab.com:49763/note_forum");
let db = mongoose.connection;

db.on('error',function (err) {
    console.log(err);
});

db.once('open',function() {
        console.log("We are connected");
});


const htmlController = require('./controllers/htmlController');

// Connect to the db

const port = process.env.PORT || 3000;
const app = express();

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
    console.log('Request Url:' + req.url);
    next();
});

htmlController(app);


app.listen(port);
