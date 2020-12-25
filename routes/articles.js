const express = require('express');
const router = express.Router();
const catchAsync = require('../HELPeR/catchAsync');
const {articleSchema} = require('../schemas.js');
const {isLoggedIn} = require('../middleware');
const ExpressError = require('../HELPeR/ExpressError');
const Article = require('../models/article');

const validateArticle = (req, res, next) => {
	const {error} = articleSchema.validate(req.body);
	if(error){
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}

router.get('/', catchAsync(async (req, res) => {
	const articles = await Article.find({});
	res.render('articles/index', {articles})
}));

router.get('/new', isLoggedIn, (req, res) => {
	res.render('articles/new');
});

router.post('/', isLoggedIn, validateArticle, catchAsync(async (req, res, next) => {
	const article = new Article(req.body.article);
	await article.save();
	req.flash('success', 'Successfully posted a new article!');
	res.redirect(`/articles/${article._id}`)
}));

router.get('/:id', catchAsync(async(req, res) => {
	const article = await Article.findById(req.params.id).populate('reviews');
	if(!article){
		req.flash('error', 'Unable to find that article!');
		return res.redirect('/articles');
	}
	res.render('articles/show', {article});
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
	const article = await Article.findById(req.params.id)
	if(!article){
		req.flash('error', 'Unable to find that article!');
		return res.redirect('/articles');
	}
	res.render('articles/edit', {article});
}));

router.put('/:id', isLoggedIn, validateArticle, catchAsync(async (req, res) => {
	const {id} = req.params;
	const article = await Article.findByIdAndUpdate(id, {...req.body.article});
	req.flash('success', 'Successfully updated article!');
	res.redirect(`/articles/${article._id}`)
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
	const {id} = req.params;
	await Article.findByIdAndDelete(id);
	req.flash('success', 'Article successfully deleted!');
	res.redirect('/articles');
}));

module.exports = router;