import { Schema, model } from 'mongoose';

// Article schema
const ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		unique: true,
		type: String,
		required: true,
	},
});

// Article model
export const Article = model<any>('Articles', ArticleSchema);
