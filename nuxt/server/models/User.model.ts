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
			default:
				'https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png',
		},
		verified: {
			type: Boolean,
			required: true,
			default: false,
		},
		description: {
			type: String,
		},
		twitter_link: {
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
