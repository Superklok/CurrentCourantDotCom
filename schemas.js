const Joi = require('joi');

module.exports.articleSchema = Joi.object({
	article: Joi.object({
		title: Joi.string().required(),
		image: Joi.string().required(),
		content: Joi.string().required()
	}).required()
});