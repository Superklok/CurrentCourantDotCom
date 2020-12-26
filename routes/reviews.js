const express = require('express');
const router = express.Router({mergeParams: true});
const {validateReview, isLoggedIn, isReviewer} = require('../middleware');
const catchAsync = require('../HELPeR/catchAsync');
const ExpressError = require('../HELPeR/ExpressError');
const Article = require('../models/article');
const Review = require('../models/review');

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
	const article = await Article.findById(req.params.id);
	const review = new Review(req.body.review);
	review.author = req.user._id;
	article.reviews.push(review);
	await review.save();
	await article.save();
	req.flash('success', 'Thanks for leaving a review!');
	res.redirect(`/articles/${article._id}`);
}));

router.delete('/:reviewId', isLoggedIn, isReviewer, catchAsync(async (req, res) => {
	const {id, reviewId} = req.params;
	await Article.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
	await Review.findByIdAndDelete(reviewId);
	req.flash('success', 'Your review has been deleted successfully!');
	res.redirect(`/articles/${id}`);
}));

module.exports = router;