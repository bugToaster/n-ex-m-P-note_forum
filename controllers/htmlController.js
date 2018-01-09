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
    
    
    app.post('/date-wise-note',function(req,res){
        let st_Date = Date.parse(req.body.first_date);
        let en_date = Date.parse(req.body.second_date);
        let date_range = req.body.first_date+"----"+req.body.second_date;
        NoteDatas.find({"note_date":{'$gte':st_Date,'$lte':en_date}}
        ,function(err,note_query_data){
            if(err){
                console.log(err);
            }else{
                res.render('note_all',{
                    Date_Range:date_range,
                    NOTES:note_query_data
                });
            }
        })
    });

	app.post('/add-note', function(req, res) {
        let note =  req.body;
        // console.log(note.note_title);
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
                // console.log("Success");
                res.redirect('/all-notes');
            }
        });



    });

	
}