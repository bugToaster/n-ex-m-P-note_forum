var bodyParser = require('body-parser');
var NoteDatas = require('../models/note_data');
const mongoDb = require('mongodb');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/all-notes', function(req, res) {
		NoteDatas.find({}, function(err,note_data) {
            if(err){
                console.log(err);
            }
            else{
                // console.log(note_data);
                res.render('note_all',{
                    NOTES:note_data
                });
            }
        })
	});
	
	app.get('/single-note/:id', function(req, res) {
	    console.log(req.params.id);
        NoteDatas.findById(req.params.id,function (err,note) {
            if(err){
                console.log(err);
            }else{
                console.log(note);
                res.render(
                    'single_note',
                    {
                        NOTE: note
                    }
                );
            }
        })


    });
	
	app.post('/add-note', function(req, res) {
        let note =  req.body;
        console.log(note.note_title);
        let add_Note = new NoteDatas();
            add_Note.note_title=note.note_title;
            add_Note.note_author=note.note_author;
            add_Note.note_body=note.note_body;
            add_Note.note_date=note.note_date;
        add_Note.save(function(err) {
            if(err){
                console.log(err);
                return;
            }else{
                console.log("Success");
                res.redirect('/all-notes');
            }
        });



    });

	
}