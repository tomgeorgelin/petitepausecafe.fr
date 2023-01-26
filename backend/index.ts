import express, { Request, Response } from 'express';
import * as mongoose from 'mongoose';

var articles = require('./routes/articles');

const app = express();
const port = 3000;

mongoose
	.connect('mongodb://127.0.0.1:27017/petitepausecafe', {})
	.then(() => console.log('pass'))
	.catch(() => console.log(' fail'));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.use('/articles', articles);

if (process.env.NODE_ENV !== 'test') {
	console.log('launching...');
	app.listen(port);
} else {
	console.log('already launch');
}
export default app;
