const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: String,
	image: String,
	content: String,
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
});

ArticleSchema.post('findOneAndDelete', async function (doc) {
	if (doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews
			}
		})
	}
});

module.exports = mongoose.model('Article', ArticleSchema);