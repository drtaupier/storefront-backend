import { User, UserStore } from '../user';
import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const store = new UserStore();
const request = supertest(app);

describe('User Model', () => {
	it('Should have an index method', () => {
		expect(store.index).toBeDefined();
	});
	it('Should have an show method', () => {
		expect(store.show).toBeDefined();
	});
	it('Should have an create method', () => {
		expect(store.create).toBeDefined();
	});
	it('Should have an delete method', () => {
		expect(store.delete).toBeDefined();
	});
	it('Should have an authentic method', () => {
		expect(store.authenticate).toBeDefined();
	});
});

describe('Users endpoints testing', () => {
	let token: string;
	it('posts to /users endpoint, create a new user', async () => {
		const response = await request
			.post('/users/register')
			.set({ 'API-Key': 'foobar', Accept: 'application/json' })
			.send({
				firstname: 'David',
				lastname: 'Rivera',
				username: 'drtaupier_test',
				password: process.env.POSTGRES_TEST_DB as string,
				role_id: 1,
			});
		token = 'Pass ' + response.body;
		expect(response.status).toEqual(200);
	});

	it('Get "/users" get all the users', async () => {
		const response = await request.get('/users').set('Authorization', token);
		expect(response.status).toEqual(200);
	});
});
