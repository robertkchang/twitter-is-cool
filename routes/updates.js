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

module.exports = router;
