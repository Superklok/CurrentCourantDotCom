const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const ImageSchema = new Schema({
	url: String,
	filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
	return this.url.replace('/upload', '/upload/w_200');
});

const ArticleSchema = new Schema({
	title: String,
	images: [ImageSchema],
	content: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
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

ArticleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', ArticleSchema);