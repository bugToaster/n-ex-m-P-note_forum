const mongoose = require('mongoose');
let Schema  = mongoose.Schema;
let note_dataSchema = Schema({
    note_title:{
        type:String,
        required:true
    },
    note_author:{
        type:String,
        required:true
    },
    note_body:{
        type:String,
        required:true
    },
    note_date:{
        type:Date,
        default:Date.now
    },
    reference:{
        type:String
    }
});
var noteDatas = module.exports= mongoose.model('note_datas',note_dataSchema);

