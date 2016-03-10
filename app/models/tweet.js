var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tweetSchema = new Schema({
	keyword: String,
	timestamp: Date,
	tweet: String},
	{collection: 'tweetKeywords'});

// the schema is useless so far
// we need to create a model using it
var Tweet = mongoose.model('Tweet', tweetSchema);

// make this available
module.exports = Tweet;
