var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

// var routes = require('./routes/index');
var updates = require('./routes/updates');

var app = express();

app.set('port', process.env.PORT || config.port || 3000);
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
console.log("config.db: " + config.db);
mongoose.connect(config.db);

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		 console.log(config.db + " database opened!");
});

// ======== SERVER ======
app.listen(app.get('port'), function(){
	console.log('listening on *:' + app.get('port'));
});

module.exports = app;
