import request from 'supertest';
import app from '../index';

describe('Hello world', () => {
	it('return hello world', async () => {
		const res = await request(app).get('/');

		expect(res.statusCode).toEqual(200);
		expect(res.text).toEqual('Hello World!');
	});
});
