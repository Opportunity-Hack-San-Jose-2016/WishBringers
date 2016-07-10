var ejs = require('ejs');
var mysql = require('./mysql');
//var connectionList = [];
//var requestList = [];
//
//function getConnection(callback, sqlQuery, callCallback) {
//	if (counter > 0) {
//		var connection = connectionList.pop();
//		counter--;
//		callCallback(callback, sqlQuery, connection);
//	} else {
//		requestList.push({
//			"callback" : callback,
//			"sqlQuery" : sqlQuery
//		});
//		setInterval(function() {
//			if (counter > 0 && requestList.length>0) {
//				var connection = connectionList.pop();
//				counter--;
//				callCallback(requestList[requestList.length-1].callback, requestList[requestList.length-1].sqlQuery, connection);
//				requestList.pop();
//			}
//		}, 0);
//		
//	}
//};

exports.getDetails = function() {
	/*setInterval(function(){
		console.log("requestList"+requestList.length);
		console.log("counter"+counter);
		console.log("connectionList"+connectionList.length);
	},3000);*/
};

//exports.createPool = function() {
//	for (i = 0; i < 100; i++) {
//		connectionList.push(mysql.createConnection({
//			host : 'localhost',
//			user : 'root',
//			password : '',
//			database : 'mydb',
//			port : 3306
//		}));
//	}
//	counter = 100;
//};


function getConnection(){
	var connection = mysql.createConnection({
		multipleStatements: true,
		connectTimeout: 6000,
		waitForConnections: true,
		pool: false,
		host     : '52.33.41.84',
		user     : 'ec2-user',
		password : 'root',
		database : 'familygivingtree',
//		port	 : 3306
	});
	return connection;
}


function fetchData(callback, sqlQuery) {

	console.log("\nSQL Query::" + sqlQuery);

	var connection = getConnection(callback, sqlQuery, function(callback,
			sqlQuery, connection) {

		connection.query(sqlQuery, function(err, rows, fields) {
			if (err) {
				console.log("ERROR: " + err.message);
			} else { // return err or result
				console.log("DB Results:" + rows);
				callback(err, rows);
			}
		});
		console.log("\nConnection released..");
		connectionList.push(connection);
		console.log("requestList"+requestList.length);
		console.log("counter"+counter);
		console.log("connectionList"+connectionList.length);
		counter++;
	});

}

exports.insertData = function(req,res)
{
    var amount = req.param("tot_amount");
    var price = req.param("price");
    var insertData = "insert into payment(`amount`,`payment_date`,`amount`) values('"+amount+"','"+sysdate+"','"+price+"');";
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results) {
                res.send(results);
            }
        }
    }, insertData);
}

exports.fetchData = fetchData;