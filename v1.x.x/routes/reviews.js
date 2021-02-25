const express = require('express');
const router = express.Router({mergeParams: true});
const {validateReview, isLoggedIn, isReviewer} = require('../middleware');
const catchAsync = require('../HELPeR/catchAsync');
const reviews = require('../controllers/reviews');

router.post('/', 
	isLoggedIn, 
	validateReview, 
	catchAsync(reviews.createReview));

router.delete('/:reviewId', 
	isLoggedIn, 
	isReviewer, 
	catchAsync(reviews.destroyReview));

module.exports = router;