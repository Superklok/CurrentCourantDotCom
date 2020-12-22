const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: String,
	image: String,
	content: String
})

module.exports = mongoose.model('Article', ArticleSchema);