const mongoose = require('mongoose');
const {adjectives, subjects} = require('./articleTitles');
const {content} = require('./articleContent');
const Article = require('../models/article');

mongoose.connect('mongodb://localhost:27017/currentcourantdotcom', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("CurrentCourantDotCom database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Article.deleteMany({});
	for(let i = 0; i < 12; i++){
		const article = new Article({
			author: '5fe508914e17b637a01bb7ef',
			title: `${sample(adjectives)} ${sample(subjects)}`,
			content: `${sample(content)}`,
			image: 'https://source.unsplash.com/collection/288926'
		})
		await article.save();
	}
}

seedDB().then(() => {
	mongoose.connection.close();
})