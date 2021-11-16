const express                                  = require('express'),
	  router                                   = express.Router({mergeParams: true}),
	  {validateReview, isLoggedIn, isReviewer} = require('../middleware'),
	  catchAsync                               = require('../HELPeR/catchAsync'),
	  reviews                                  = require('../controllers/reviews');

router.post('/', 
	isLoggedIn, 
	validateReview, 
	catchAsync(reviews.createReview));

router.delete('/:reviewId', 
	isLoggedIn, 
	isReviewer, 
	catchAsync(reviews.destroyReview));

module.exports = router;