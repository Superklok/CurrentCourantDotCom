const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../HELPeR/catchAsync');
const {reviewSchema} = require('../schemas.js');
const ExpressError = require('../HELPeR/ExpressError');
const Article = require('../models/article');
const Review = require('../models/review');

const validateReview = (req, res, next) => {
	const {error} = reviewSchema.validate(req.body);
	if(error){
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}

router.post('/', validateReview, catchAsync(async (req, res) => {
	const article = await Article.findById(req.params.id);
	const review = new Review(req.body.review);
	article.reviews.push(review);
	await review.save();
	await article.save();
	req.flash('success', 'Thanks for leaving a review!');
	res.redirect(`/articles/${article._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
	const {id, reviewId} = req.params;
	await Article.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
	await Review.findByIdAndDelete(reviewId);
	req.flash('success', 'Your review has been successfully deleted!');
	res.redirect(`/articles/${id}`);
}));

module.exports = router;