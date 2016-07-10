
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mysql = require('./routes/mysql')
  , group = require('./routes/wishes')
  , wishes = require('./routes/wishes') 
  ,http = require('http')
  , path = require('path');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

// app.get('/getWishes',group.getWishes);
app.get('/totalWishes', function(req, res) {
	
	 // req.session.valid = true;
	  res.render('totalWishes');
	});


//app.get('/totalWishes', function(req, res) {
////    var user_id = req.body.userSelection;
////    var name = req.body.username;
//    
//    res.redirect('/totalWishes');
//    	
//    
//});

app.get('/registerdonors', routes.registercompany);

app.get('/getWishes',wishes.getWishes);
//app.get('/addOrganization',org.addOrganization);
//app.get('/addDonation',donation.addDonation);

app.get('/UploadWishes', function(req, res) {
	res.render('../views/WishUploader.ejs');
});

app.post('/InsertWishes',wishes.uploadData);

app.get('/home/*', function(req,res){
	
	res.render('home');
});


http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/home', function(req,res){
	res.render('home');
});

