import { Schema, model } from 'mongoose';
import { Article } from '~/server/models/Article.model';

const ArticleSchema = new Schema({
	title: {
		type: String,
	},
	slug: {
		type: String,
	},
});

export default defineEventHandler(async (event) => {
	const articles = await Article.find();
	return {
		articles,
	};
});
