const mongoose = require('mongoose');
const { adjectives, subjects } = require('./articleTitles');
const { content } = require('./articleContent');
const articleImg1 = require('./articleImg1');
const articleImg2 = require('./articleImg2');
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
	for(let i = 0; i < 200; i++){
		const random30Img1 = Math.floor(Math.random() * 30);
		const random30Img2 = Math.floor(Math.random() * 30);
		const article = new Article({
			// author: 'ObjectId' (In MongoDB Shell, run db.users.find() once a user has been created.)
			author: '5fe508914e17b637a01bb7ef',
			title: `${ sample(adjectives) } ${ sample(subjects) }`,
			content: `${ sample(content) }`,
			images: [
				{
					url: `${ articleImg1[random30Img1].url }`,
					filename: `${ articleImg1[random30Img1].filename }`
				},
				{
					url: `${ articleImg2[random30Img2].url }`,
					filename: `${ articleImg2[random30Img2].filename }`
				}
			]
		})
		await article.save();
	}
}

seedDB().then(() => {
	mongoose.connection.close();
})