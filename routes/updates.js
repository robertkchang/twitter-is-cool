var express = require('express');
var Update = require('../app/models/update');
var router = express.Router();

router.get('/updates', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	Update.find({}, function(err, updates) {
		if (err) {return next(err);}
		if (updates.length == 0) { return next("no updates found"); };
		res.json(updates);
	})
});

router.get('/updates/:keyword', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	Update.find({keyword: req.params.keyword}, function(err, update) {
		if (err) {return next(err);}
		if (update.length == 0) { return next("no update found for keyword " + req.params.keyword); };
		res.json(update);
	});
});

router.post('/updates', function(req, res, next) {
	console.log('POSTING!');
	res.header('Access-Control-Allow-Origin', "*");

	Update.findOne({ keyword: req.body['keyword'] }, function(err, update) {
		if (err || update==null) {
			updateToSave = new Update();
			updateToSave['keyword'] = req.body['keyword'];
		} else {
			updateToSave = update;
		}

		updateToSave['count'] = req.body['hourly_total'];
		updateToSave['lastUpdated'] = Date.now();
		updateToSave.save(function(err) {
			if (err) {
				res.status(404);
				return res.send("error: " + err);
			} else {
				res.json(updateToSave);
			}
		})
	});
});

module.exports = router;
