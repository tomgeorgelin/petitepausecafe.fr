import { Schema, model } from 'mongoose';

// Comment schema
export const CommentSchema = new Schema(
	{
		body: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: false,
		},
		parent_id: {
			type: Schema.Types.ObjectId,
			ref: 'Comments',
		},
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Users',
		},
		article_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Articles',
		},
		active_at: {
			type: Date,
		},
	},
	{ timestamps: true }
);

// Comment model
export const Comment = model<any>('Comments', CommentSchema);
