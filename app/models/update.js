var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var updateSchema = new Schema({
	keyword: String,
	count: Number,
	lastUpdated: Date},
	{collection: 'updates'});

// the schema is useless so far
// we need to create a model using it
var Update = mongoose.model('Update', updateSchema);

// make this available
module.exports = Update;
