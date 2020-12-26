const {articleSchema, reviewSchema} = require('./schemas.js');
const ExpressError = require('./HELPeR/ExpressError');
const Article = require('./models/article');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You must be logged in to do that!');
		return res.redirect('/login');
	}
	next();
}

module.exports.validateArticle = (req, res, next) => {
	const {error} = articleSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}

module.exports.isAuthor = async (req, res, next) => {
	const {id} = req.params;
	const article = await Article.findById(id);
	if (!article.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do that!');
		return res.redirect(`/articles/${id}`);
	}
	next();
}

module.exports.isReviewer = async (req, res, next) => {
	const {id, reviewId} = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do that!');
		return res.redirect(`/articles/${id}`);
	}
	next();
}

module.exports.validateReview = (req, res, next) => {
	const {error} = reviewSchema.validate(req.body);
	if(error){
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}