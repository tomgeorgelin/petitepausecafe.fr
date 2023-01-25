const express = require('express');
const app = express();
const port = 3000;

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
