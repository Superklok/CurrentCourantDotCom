if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}

const express = require('express'),
	  path    = require('path'),
	  ejsMate = require('ejs-mate'),
	  app     = express();

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Serving on port ${ port }`);
});