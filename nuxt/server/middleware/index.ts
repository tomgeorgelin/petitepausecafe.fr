import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';
import { Permission } from '../models/Permission.model';

export default defineEventHandler(async (event) => {
	const route = protectedRoutes.find((e) => {
		return (
			getRequestURL(event).toString().includes(e.name) &&
			e.method === getMethod(event)
		);
	});
	if (!route) return;

	const token = getHeader(event, 'x-auth-token');
	if (!token) {
		throw createError({
			statusCode: 403,
			statusMessage: "You don't have the right",
		});
	}
	if (route && token) {
		const decodedToken = jwt.decode(token);
		if (decodedToken) {
			// @ts-ignore
			const user = await User.findById(decodedToken.user_id);
			if (user) {
				const permission = await Permission.exists({
					role_id: user.role_id,
					operation: route.operation,
					object: route.object,
				});
				if (permission) {
					return;
				}
			}
			throw createError({
				statusCode: 403,
				statusMessage: "You don't have the right",
			});
		}
		throw createError({
			statusCode: 403,
			statusMessage: "You don't have the right",
		});
	}
});

const protectedRoutes = [
	{
		name: '/api/articles',
		method: 'DELETE',
		object: 'articles',
		operation: 'delete',
	},
	{
		name: '/api/articles',
		method: 'PUT',
		object: 'articles',
		operation: 'update',
	},
	{
		name: '/api/articles/create',
		method: 'POST',
		object: 'articles',
		operation: 'create',
	},
	{
		name: '/api/categories',
		method: 'PUT',
		object: 'categories',
		operation: 'update',
	},
	{
		name: '/api/categories/create',
		method: 'POST',
		object: 'categories',
		operation: 'create',
	},
	{
		name: '/api/comments',
		method: 'PUT',
		object: 'comments',
		operation: 'update',
	},
	{
		name: '/api/comments/create',
		method: 'POST',
		object: 'comments',
		operation: 'create',
	},
	{
		name: '/api/permissions',
		method: 'GET',
		object: 'permissions',
		operation: 'manage',
	},
	{
		name: '/api/permissions/create',
		method: 'POST',
		object: 'permissions',
		operation: 'create',
	},
	{ name: '/api/roles', method: 'GET', object: 'roles', operation: 'manage' },
	{ name: '/api/roles', method: 'PUT', object: 'roles', operation: 'update' },
	{
		name: '/api/users',
		method: 'DELETE',
		object: 'user',
		operation: 'manage',
	},
	{ name: '/api/users', method: 'GET', object: 'users', operation: 'manage' },
	{
		name: '/api/profile',
		method: 'GET',
		object: 'user',
		operation: 'manage',
	},
	{ name: '/api/users', method: 'PUT', object: 'users', operation: 'update' },
	{
		name: '/api/users/update-password',
		method: 'PUT',
		object: 'users',
		operation: 'update',
	},
];
