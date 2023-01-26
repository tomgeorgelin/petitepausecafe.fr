import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');

router.use((req: Request, res: Response, next: NextFunction) => next());

router.get('/', async function (req: Request, res: Response) {
	const articles = await Article.find();
	res.json(articles);
});

module.exports = router;
