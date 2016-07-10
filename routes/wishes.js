var ejs = require("ejs");
var fs = require('fs');
var Papa = require('babyparse');
//var mysql = require('./mysql');
exports.uploadData = function(req, res) {
	//console.log(req);
	
	var content = fs.readFileSync(req.files.file.path, { encoding: 'binary' });
	Papa.parse(content, {
	    step: function(row){
	        console.log("Row: ", row.data);
	    }
	});
	
	res.render('home.ejs');	
};

