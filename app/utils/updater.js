var Tweet = require('../models/tweet');
var Update = require('../models/update');
var request = require('request');

var Updater = function(configuration) {
	this.keywords = configuration.keywordsArr;
	this.interval = configuration.updaterInterval;
}

Updater.prototype.start = function() {
	self = this;
	setInterval(function(){
		// count tweets since last update time for each keyword
		var hourAgo = new Date().getTime() - self.interval;
		self.keywords.forEach(function(elem, idx, arr){
			Tweet.aggregate([
				{
					$match: {
						keyword: elem,
						timestamp: {$gt: new Date(hourAgo)}
					}
				},
				{
					$group: {
						_id: null,
						count: {$sum: 1}
					}
				}
			], function (err, result) {
				if (err) {
					console.log("Error counting: " + err);
				} else {
					self.saveUpdate(result, elem);
				}
			});
		});
	}, this.interval)
};

Updater.prototype.saveUpdate = function(result, elem){
	var count = 0;
	if (result.length==1) {
		count = result[0]['count'];
	}
	console.log("keyword: " + elem + "; " + count);

	// post updates
	request({
		url: 'http://localhost:5000/v1/updates', //URL to hit
		qs: {from: 'blog example', time: +new Date()}, //Query string data
		method: 'POST',
		//Lets post the following key/values as form
		json: {
			keyword: elem,
			hourly_total: count
		}
	}, function(error, response, body) {
		if(error) {
			console.log('Updater error saving: ' + error);
		} else {
			console.log(response.statusCode, body);
		}
	});
};

module.exports = Updater;
