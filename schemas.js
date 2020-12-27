const Joi = require('joi');

module.exports.articleSchema = Joi.object({
	article: Joi.object({
		title: Joi.string().required(),
		content: Joi.string().required()
	}).required(),
	destroyImg: Joi.array()
});

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		rating: Joi.number().required().min(0).max(5),
		body: Joi.string().required()
	}).required()
});