var Twitter = require('twitter');
var Tweet = require('../models/tweet');
var Util = require('../utils/util');

var TwitterClient = function(configuration) {
		this.client = null;
		this.configuration = configuration;
}

TwitterClient.prototype.init = function(){
	// init twitter client
	this.client = new Twitter({
		// TODO: thse values should be in environment variables
		consumer_key: 'bc7IcHgS2C8xoCL58IIxa3aLG',
		consumer_secret: 'b9gqAYpeWam7HcjrkFHqDloVWZKSo5VQSrNFhwLNwEY9lAJlDe',
		access_token_key: '2166141289-Iv5gxd1Cdt14BcLUOrRaAHgsCWhsSjkLCUbpOXW',
		access_token_secret: 'Kih9SeijazQb3VE0OMQVBXoc4pbYl6aKc96sPTg2SI21H',
	});

	self = this;
	this.client.stream('statuses/filter', {track: self.configuration.keywords}, function(stream) {
		self_2 = self;
		stream.on('data', function(tweet) {
			// save!
			var tweetKeyword = Util.keywordFromTweet(self_2.configuration.keywordsArr, tweet.text);
			var saveThisTweet = new Tweet({ keyword: tweetKeyword, timestamp: new Date(), tweet: tweet.text });
			saveThisTweet.save(function (err, saveThisTweet) {
				if (err) return console.error(err);
			});
		});

		stream.on('error', function(error) {
			console.log ('error: ', error)
			throw error;
		});
	});
}

module.exports = TwitterClient;
