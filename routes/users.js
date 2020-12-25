const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../HELPeR/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
	try {
		const {email, username, password} = req.body;
		const user = new User({email, username});
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, err => {
			if (err) return next(err);
			req.flash('success', 'Welcome to The Current Courant!');
			res.redirect('/articles');
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('register');
	}
}));

router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
	req.flash('success', 'Welcome back!');
	const redirectURL = req.session.returnTo || '/articles';
	delete req.session.returnTo;
	res.redirect(redirectURL);
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', "Thank you for choosing The Current Courant!");
	res.redirect('/articles');
});

module.exports = router;