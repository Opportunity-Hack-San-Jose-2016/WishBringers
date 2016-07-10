var ejs = require("ejs");
var mysql = require('./mysql');

exports.getWishes = function(req,res)
{
	var getWishes = "select * from wishes";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				res.send(results);
			}
		}
	}, getWishes);
}

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


