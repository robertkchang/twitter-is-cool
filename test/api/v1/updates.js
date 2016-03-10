var mongoose = require('mongoose');
var Configure = require('../../../app/utils/configure');
var DatabaseUtils = require('../../utils/database_utils');

var Update = require('../../../app/models/update');
var Tweet = require('../../../app/models/tweet');

var should = require('chai').should(),
		supertest = require('supertest'),
		assert = require('assert'),
		api = supertest('http://localhost:5000');
var configuration = new Configure();
configuration.load();

describe('Updates', function(){
	beforeEach(function(){
		// ======== MONGOOSE ======
		mongoose.connect('mongodb://localhost/twitter-is-cool-test');

		var db = mongoose.connection;
			db.on('error', console.error.bind(console, 'connection error:'));
			db.once('open', function (callback) {
				 console.log("twitter-is-cool-test database opened!");
		});

		DatabaseUtils.cleanDB();

		update = new Update();
		update['keyword'] = 'Test';
		update['count'] = 100;
		update['lastUpdated'] = Date.now();

		update2 = new Update();
		update2['keyword'] = 'Tes2t';
		update2['count'] = 200;
		update2['lastUpdated'] = Date.now();

		update.save(function(err) {
			if (err) {
				console.log("error: " + err);
			} else {
				console.log("saving update");
			}
		});

		update2.save(function(err) {
			if (err) {
				console.log("error: " + err);
			} else {
				console.log("saving update2");
			}
		});
	})

	describe('GET /updates', function(){
		it('should return 200', function(done){
			api.get('/v1/updates')
				 .expect(200, done);
		})
	})

	describe('GET /updates/keyword', function(){
		it('should return 200', function(done){
			firstKeyword = configuration.keywordsArr[0];
			api.get('/v1/updates/' + firstKeyword)
				 .expect(200, done);
		})
	})
})
