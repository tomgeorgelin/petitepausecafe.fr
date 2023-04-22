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
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Roles',
		},
	},
	{ timestamps: true }
);

// Permission model
export const Permission = model<any>('Permissions', PermissionSchema);
