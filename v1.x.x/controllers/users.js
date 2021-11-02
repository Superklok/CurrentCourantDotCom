const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
	res.render('users/register');
}

module.exports.register = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = await new User({ email, username });
		if(req.body.authorCode === process.env.AUTHOR_CODE){
		user.isAuthor = true;
			} else {
				req.flash('error', 'Please email trev@superklok.com to request an author code in order to complete your registration.');	
				return res.redirect('/register');
			}
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
}

module.exports.renderLogin = (req, res) => {
	res.render('users/login');
}

module.exports.login = (req, res) => {
	req.flash('success', 'Welcome back!');
	const redirectURL = req.session.returnTo || '/articles';
	delete req.session.returnTo;
	res.redirect(redirectURL);
}

module.exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Thank you for choosing The Current Courant!');
	res.redirect('/articles');
}