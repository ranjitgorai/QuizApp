var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	name     : String,
	date_add : String,
	score :Number
	  
	
});


   module.exports = mongoose.model('user', userSchema);