var express = require('express');
var router = express.Router();

var Question = require('../models/question');
var User = require('../models/user');
var moment = require('moment');

router.get('/quizeapp', function(req, res, next) {
  res.render('user', { title: 'Welcome to Play Quiz '});
});

router.post('/quizeapp',function(req,res){

     var num = req.body.username;
      //console.log(num);
     var data = {'name' : num};
     //console.log(data);
     var  user = new User(data);
     user.date_add = moment().format('LLL');
     user.score = "";
     user.save(function (err, result){
        //console.log(result);
            if(err){
              return res.json({error: true , reason: err});
            }
            return res.send(num);
      });

});


router.get('/quizeapp/quizepage/:id', function(req, res) {
   var user =req.params.id;
	Question.find({})
   .exec(function(err,result){
   //console.log(result) ;
    if(err) {}

    res.render("quizepage",{ quest : result , user : user });
    });
  //res.render('quizepage');
});


 router.post('/AnswersPost' , function(req,res){
 	//console.log(req.body);
 	var scoreCntr = 0;
 	var CurrentUser = req.body.CurrentUser;
 	Question.find({}).sort({'_id':1}).exec(function(err,data){
 		if(err) res.send(err);
 		// logic to see each result
 		 for(var i=0 ; i < data.length ; i++) {

 		 	var optinStr = 'optradio'+i;

 		 	if((req.body[optinStr]) == (data[i].correct)) {
 		 		scoreCntr = scoreCntr +1;
 		 	}

 		 }
 			//update user score
			User.findOneAndUpdate({name: CurrentUser}, {$set:{score: scoreCntr}}, {new: true}, function(err, result){
			if(err){
					console.log("Something wrong when updating data!");
			}

					res.render("ScorePage",{ result : result});
			});
 	});
 });


module.exports = router;
