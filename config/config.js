var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
	development: {
		db: 'mongodb://localhost/twitter-is-cool',
		port: 5000
	},
	test: {
		db: 'mongodb://localhost/twitter-is-cool-test',
		port: 5000
	}
}
