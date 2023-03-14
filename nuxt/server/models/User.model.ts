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
		token: {
			type: String,
		},
	},
	{ timestamps: true }
);

// User model
export const User = model<any>('Users', UserSchema);
