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
		image: {
			type: String,
			required: true,
		},
		deletedAt: {
			type: Date || null,
			default: null,
		},
		// user_id: {
		// 	type: Schema.Types.ObjectId,
		// 	required: true,
		// 	ref: 'Users',
		// },
	},
	{ timestamps: true }
);

// Category model
export const Category = model<any>('Categories', CategorySchema);
