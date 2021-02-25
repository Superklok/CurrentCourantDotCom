const Article = require('../models/article');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
	const article = await Article.findById(req.params.id);
	const review = new Review(req.body.review);
	review.author = req.user._id;
	article.reviews.push(review);
	await review.save();
	await article.save();
	req.flash('success', 'Thanks for leaving a review!');
	res.redirect(`/articles/${ article._id }`);
}

module.exports.destroyReview = async (req, res) => {
	const { id, reviewId } = req.params;
	await Article.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	await Review.findByIdAndDelete(reviewId);
	req.flash('success', 'Your review has been deleted successfully!');
	res.redirect(`/articles/${ id }`);
}