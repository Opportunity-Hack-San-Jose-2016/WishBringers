
/*
 * GET home page.
 */
var ejs = require("ejs");

exports.index = function(req, res){
 // res.render('index', { title: 'Test' });
// Sonika:	 res.render('login.ejs');
	console.log("Hi");
	res.render('home.ejs');
	
};

exports.registercompany = function(req, res){

	   console.log("Hi");
	   res.render('register.ejs');

	}
