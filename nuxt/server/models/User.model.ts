import { Schema, model } from 'mongoose';

// User schema
export const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		role_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Roles',
		},
		token: {
			type: String,
		},
	},
	{ timestamps: true }
);

// User model
export const User = model<any>('Users', UserSchema);
