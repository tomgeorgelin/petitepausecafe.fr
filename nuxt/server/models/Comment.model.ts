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
			required: true,
			ref: 'Comments',
		},
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Users',
		},
		active_at: {
			type: Date,
		},
	},
	{ timestamps: true }
);

// Comment model
export const Comment = model<any>('Comments', CommentSchema);
