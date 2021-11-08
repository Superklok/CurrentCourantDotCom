const Article = require('../models/article');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
	if (!req.query.page) {
		const articles = await Article.paginate({}, {});
		res.render('articles/index', { articles });
	} else {
		const { page } = req.query;
		const articles = await Article.paginate({}, {
			page
		});
		res.status(200).json(articles);
	}
}

module.exports.renderNewForm = (req, res) => {
	res.render('articles/new');
}

module.exports.createArticle = async (req, res, next) => {
	const article = new Article(req.body.article);
	article.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
	article.author = req.user._id;
	await article.save();
	req.flash('success', 'Successfully published a new article!');
	res.redirect(`/articles/${ article._id }`);
}

module.exports.showArticle = async(req, res) => {
	const article = await Article.findById(req.params.id).populate({
		path: 'reviews',
		populate: {
			path: 'author'
		}
	}).populate('author');
	if (!article) {
		req.flash('error', 'Sorry, the article you requested cannot be found.');
		return res.redirect('/articles');
	}
	res.render('articles/show', { article });
}

module.exports.renderEditForm = async (req, res) => {
	const { id } = req.params;
	const article = await Article.findById(id)
	if (!article) {
		req.flash('error', 'Sorry, the article you requested cannot be found.');
		return res.redirect('/articles');
	}
	res.render('articles/edit', { article });
}

module.exports.updateArticle = async (req, res) => {
	const { id } = req.params;
	const article = await Article.findByIdAndUpdate(id, { ...req.body.article });
	const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
	article.images.push(...imgs);
	await article.save();
	if (req.body.destroyImg) {
		for (let filename of req.body.destroyImg) {
			await cloudinary.uploader.destroy(filename);
		}
		await article.updateOne({ $pull: { images: { filename: { $in: req.body.destroyImg } } } });
	}
	req.flash('success', 'Article updated successfully!');
	res.redirect(`/articles/${ article._id }`);
}

module.exports.destroyArticle = async (req, res) => {
	const { id } = req.params;
	await Article.findByIdAndDelete(id);
	req.flash('success', 'Article deleted successfully!');
	res.redirect('/articles');
}