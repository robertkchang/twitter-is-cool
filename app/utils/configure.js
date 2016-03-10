var Configure = function() {
	this.keywords = '';
	this.keywordsArr = [];
	this.updaterInterval = 0;
};

Configure.prototype.load = function() {
	var configurationFile = __dirname + '/../../config/configuration.json';
	var fs = require('fs');
	parsed = JSON.parse(fs.readFileSync(configurationFile));
	this.keywords = parsed['keywords'];
	this.keywordsArr = this.keywords.split(',');
	this.updaterInterval = parsed['updaterInterval'];
}

module.exports = Configure;
