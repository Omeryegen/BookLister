const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
PORT = 3000;

mongoose.set('strictQuery', true); 
mongoose.connect('mongodb://127.0.0.1/booksDB');
const bookSchema = {
    name: String,
    author: String,
}
const Book = mongoose.model("book", bookSchema);

app.get('/:what', function(req, res){
    res.render('notFound')
});

app.get("/", function(req,res){
    Book.find({}, function(err, docs){
        if(!err){
            if(docs.length === 0){
                res.render("body", {array: docs})
            }else{
                res.render("body", {array: docs});
            };
        };
    });
    
});
app.post('/', function(req,res){
    const bookName = req.body.bookName;
    const bookAuthor = req.body.bookAuthor;
    if(bookName.length === 0 || bookAuthor.length === 0){
        res.redirect('/');
    }else {
        const book = new Book({
            name: bookName,
            author: bookAuthor
        });
        book.save();
        res.redirect('/');
    };
});

app.post('/delete', function(req,res){
    Book.deleteOne({id: req.body.id}, function(err){
        if(!err){
            res.redirect('/');
        };
    });
});


app.listen(PORT, function(){
    console.log('Listening the PORT: ' + PORT)
});