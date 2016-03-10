var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

// var routes = require('./routes/index');
var updates = require('./routes/updates');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

// ==== ROUTE STUFF ======
app.use('/v1', updates);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

// ======== CLASSES ==========
var Configure = require('./app/utils/configure');
var TwitterClient = require('./app/utils/twitter_client');
var Updater = require('./app/utils/updater');

// ======== CONFIG and SERVICES ======
var configuration = new Configure();
configuration.load();

var client = new TwitterClient(configuration);
client.init();

var updater = new Updater(configuration);
updater.start();

// ======== MONGOOSE ======
mongoose.connect('mongodb://localhost/twitter-is-cool');

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		 console.log("twitter-is-cool database opened!");
});

// ======== SERVER ======
app.listen(5000, function(){
	console.log('listening on *:5000');
});

module.exports = app;
