import { Schema, model, Document } from 'mongoose';

// Role schema
const RoleSchema = new Schema(
	{
		name: {
			type: String,
		},
		slug: {
			type: String,
		},
	},
	{ timestamps: true }
);

// Role model
export const Role = model<any>('Roles', RoleSchema);
