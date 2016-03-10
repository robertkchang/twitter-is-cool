var Update = require('../../app/models/update');
var Tweet = require('../../app/models/tweet');

var DatabaseUtils = function() {};

DatabaseUtils.cleanDB = function() {
	debugger;
	Update.find({}).remove().exec();
	Tweet.find({}).remove().exec();
}

module.exports = DatabaseUtils;
