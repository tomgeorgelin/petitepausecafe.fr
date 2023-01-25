const express = require('express');
var articles = require('./routes/articles');

const app = express();
const port = 3000;
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://127.0.0.1:27017/petitepausecafe', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('pass'))
	.catch((e) => console.log(' fail'));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/articles', articles);

if (process.env.NODE_ENV !== 'test') {
	console.log('launching...');
	app.listen(port);
} else {
	console.log('already launch');
}
module.exports = app;
