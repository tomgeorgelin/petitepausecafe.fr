import { Schema, model } from 'mongoose';
import { CommentSchema } from './Comment.model';
// Article schema
const ArticleSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			min: 3,
		},
		slug: {
			unique: true,
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		seo_title: {
			type: String,
			required: true,
		},
		seo_description: {
			type: String,
			required: true,
		},
		seo_keywords: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: false,
		},
		image: {
			type: String,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Users',
		},
		category_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Categories',
		},
		active_at: {
			type: Date,
		},
		comments: {
			type: [CommentSchema],
		},
	},
	{ timestamps: true }
);

// Article model
export const Article = model<any>('Articles', ArticleSchema);
