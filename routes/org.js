var ejs = require("ejs");
var mysql = require('./mysql');

exports.addOrganization = function(req,res)
{
	var fullName = req.param("fullname");
	var logoURL = req.param("logoURL");
	var email = req.param("email");
	var dispName = req.param("dispName");
	var size = req.param("size");
	var zipcode = req.param("zipcode");
	var addOrganization = "insert into organization (`organization_name`,`zipcode`,`displayname`,`logo_url`,`organization_leader`,`company_size`) values'"
			+ fullName
			+ "','"
			+ zipcode
			+ "','"
			+ dispName
			+ "','"
			+ logoURL
			+ "','" + email + "','" + size + "');";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results) {
				console.log("successful"+results);
				res.send(results);
			}
		}
	}, addOrganization);
}