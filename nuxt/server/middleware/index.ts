import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';
import { Permission } from '../models/Permission.model';

/**
 * @description Check if the user has the right to access the route
 */
export default defineEventHandler(async (event) => {
	// we get the route if it exists
	const route = protectedRoutes.find((e) => {
		return (
			getRequestURL(event).toString().includes(e.name) &&
			e.method === getMethod(event)
		);
	});
	// if the route doesn't exist, end of the function because it is not protected
	if (!route) return;

	// we get the user token
	const token = getHeader(event, 'x-auth-token');
	// if the user is not logged in or dont have the token, we throw an error
	if (!token) {
		// this error is because the user dont have the right to access the route
		throw createError({
			statusCode: 403,
			statusMessage: "You don't have the right",
		});
	}
	// if the user is logged in and have the token, we check if he has the right to access the route
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
				// if the user has the right, end of function and he can access the route
				if (permission) {
					return;
				}
			}
			// this error is because the user dont have the right to access the route
			throw createError({
				statusCode: 403,
				statusMessage: "You don't have the right",
			});
		}
		// this error is because the user dont have the right to access the route
		throw createError({
			statusCode: 403,
			statusMessage: "You don't have the right",
		});
	}
});

/**
 * @description List of protected routes
 */
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
