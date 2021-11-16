const express    = require('express'),
	  router     = express.Router(),
	  passport   = require('passport'),
	  catchAsync = require('../HELPeR/catchAsync'),
	  users      = require('../controllers/users');

router.route('/register')
	.get(users.renderRegister)
	.post(catchAsync(users.register))

router.route('/login')
	.get(users.renderLogin)
	.post(passport.authenticate('local', 
		{ failureFlash: true, failureRedirect: '/login' }), 
		users.login)

router.get('/logout', users.logout);

module.exports = router;