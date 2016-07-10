var ejs = require("ejs");
var mysql = require('./mysql');

exports.addDonation = function(req,res)
{
	var donor_id; //from session
	var payment_id;//from session
	var tot_wishes = req.param("tot_wishes");
	var tot_amount = req.param("tot_amount");
	var addDonation = "insert into donation(`donor_id`,`payment_id`,`total_wishes`,`total_amount`) values('"
			+ donor_id
			+ "','"
			+ payment_id
			+ "','"
			+ tot_wishes
			+ "','"
			+ tot_amount + "');";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				console.log("successful"+results);
				res.send(results);
			}
		}
	}, addDonation);
}