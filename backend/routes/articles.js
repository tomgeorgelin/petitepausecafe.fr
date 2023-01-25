const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');

router.use((req, res, next) => next());

router.get('/', async function (req, res) {
	const articles = await Article.find();
	res.json(articles);
});

module.exports = router;
