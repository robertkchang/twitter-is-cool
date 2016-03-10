var Tweet = require('../models/tweet');
var Update = require('../models/update');

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
	Update.findOne({ keyword: elem }, function(err, update) {
		if (err || update==null) {
			updateToSave = new Update();
			updateToSave['keyword'] = elem;
		} else {
			updateToSave = update;
		}

		updateToSave['count'] = count;
		updateToSave['lastUpdated'] = Date.now();
		updateToSave.save(function(err) {
			if (err) {
				console.log('Error saving update: ' + err);
			} else {
				console.log('Update saved.');
			}
		})
	});
};

module.exports = Updater;
