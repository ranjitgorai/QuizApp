var mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
	questions           : String,
	options : [{type : String}],
	correct         : String ,
	_id : String
	
});


   module.exports = mongoose.model('Question', questionSchema);
