var DatabaseUtils = require('../../utils/database_utils');

var should = require('chai').should(),
		supertest = require('supertest'),
		assert = require('assert'),
		api = supertest('http://localhost:5000');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config')[env];

describe('Updates', function(){
	before(function(done){
		beforeFn = function(cb) {
			DatabaseUtils.connectDB(config);
			DatabaseUtils.cleanDB();
			DatabaseUtils.stageData();
			if (cb) { cb(); };
		}
		beforeFn(function(){ done(); });
	});

	after(function(done){
		afterFn = function(cb) {
			DatabaseUtils.closeDB(config);
			if (cb) { cb(); };
		}
		afterFn(function(err){done();});
	})

	describe('/updates', function(){
		it('GET /updates should return 200', function(done){
			console.log('running GET /updates');
			api.get('/v1/updates')
				 .expect(200, done);
		})

		it('GET /updates/:keyword should return 200', function(done){
			console.log('running GET /updates/:keyword');
			api.get('/v1/updates/Test')
				 .expect(200, done);
		})
	});
})
