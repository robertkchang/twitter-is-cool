var mongoose = require('mongoose');
var Update = require('../../app/models/update');
var Tweet = require('../../app/models/tweet');

var DatabaseUtils = function() {};

DatabaseUtils.connectDB = function(config) {
	console.log("config.db: " + config.db);
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		 console.log(config.db + " database opened for testing!");
	});

	mongoose.connect(config.db);
}

DatabaseUtils.closeDB = function(config) {
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'close connection error:'));
	db.once('close', function (callback) {
		 console.log(config.db + " database closed.");
	});

	db.close();
}

DatabaseUtils.cleanDB = function() {
	console.log("cleaning DB");
	Update.find({}).remove().exec();
	Tweet.find({}).remove().exec();
}

DatabaseUtils.stageData = function() {
	console.log("staging data");
	update = new Update();
	update['keyword'] = 'Test';
	update['count'] = 100;
	update['lastUpdated'] = Date.now();

	update2 = new Update();
	update2['keyword'] = 'Test2';
	update2['count'] = 200;
	update2['lastUpdated'] = Date.now();

	update.save(function(err) {
		console.log('saving!');
		if (err) {
			console.log("error: " + err);
		} else {
			console.log("saving update");
		}
	});

	update2.save(function(err) {
		console.log('saving!');
		if (err) {
			console.log("error: " + err);
		} else {
			console.log("saving update2");
		}
	});
}

module.exports = DatabaseUtils;
