import { Schema, model } from 'mongoose';

// Permission schema
const PermissionSchema = new Schema(
	{
		object: {
			type: String,
		},
		operation: {
			type: String,
		},
		role_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Permission model
export const Permission = model<any>('Permissions', PermissionSchema);
