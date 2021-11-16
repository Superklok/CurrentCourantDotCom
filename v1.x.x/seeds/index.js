if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}

const mongoose                 = require('mongoose'),
	  { adjectives, subjects } = require('./articleTitles'),
	  { content }              = require('./articleContent'),
	  articleImg1              = require('./articleImg1'),
	  articleImg2              = require('./articleImg2'),
	  Article                  = require('../models/article');

// Production Database
// const dbUrl = process.env.DB_URL;

// Development Database
const dbUrl = 'mongodb://localhost:27017/currentcourantdotcom';

mongoose.connect(dbUrl, {
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

			// **author: 'ObjectId' (In MongoDB Shell, run db.users.find() once a user has been created.)**
			
			// Production Database User
			// author: '5ff38869ea3eb6036c3ddcc7',

			// Development Database User
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