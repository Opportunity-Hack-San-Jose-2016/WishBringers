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