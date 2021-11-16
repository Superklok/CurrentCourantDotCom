const express                                   = require('express'),
	  router                                    = express.Router(),
	  articles                                  = require('../controllers/articles'),
	  catchAsync                                = require('../HELPeR/catchAsync'),
	  { isLoggedIn, isAuthor, validateArticle } = require('../middleware'),
	  multer                                    = require('multer'),
	  { storage }                               = require('../cloudinary'),
	  upload                                    = multer({ storage });

router.route('/')
	.get(catchAsync(articles.index))
	.post(isLoggedIn, 
		upload.array('image'), 
		validateArticle, 
		catchAsync(articles.createArticle))

router.get('/new', 
	isLoggedIn, 
	articles.renderNewForm);

router.route('/:id')
	.get(catchAsync(articles.showArticle))
	.put(isLoggedIn, 
		isAuthor, 
		upload.array('image'), 
		validateArticle, 
		catchAsync(articles.updateArticle))
	.delete(isLoggedIn, 
		isAuthor, 
		catchAsync(articles.destroyArticle))

router.get('/:id/edit', 
	isLoggedIn, 
	isAuthor, 
	catchAsync(articles.renderEditForm));

module.exports = router;