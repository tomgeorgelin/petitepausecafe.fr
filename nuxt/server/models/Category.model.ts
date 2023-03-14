import { Schema, model } from 'mongoose';

// Category schema
const CategorySchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		slug: {
			type: String,
			unique: true,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Category model
export const Category = model<any>('Categories', CategorySchema);
