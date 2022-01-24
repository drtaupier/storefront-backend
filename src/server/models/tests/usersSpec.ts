import { User, UserStore } from '../user';
import supertest from 'supertest';
const store = new UserStore();
import app from '../../server';
import { response } from 'express';
const request = supertest(app);

describe('User Model', () => {
	describe('Test method exists', () => {
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

	describe('Test user model logic', () => {
		let token: string;
		const user = {
			firstname: 'David',
			lastname: 'Rivera',
			username: 'drtaupier_test',
			password: 'password123',
			role_id: 1,
		} as User;

		beforeAll(async () => {
			const response = await request
				.post('/user/login')
				.send({
					username: 'drtaupier_test',
					password: 'password123',
				})
				.set('Accept', 'application/json');
			token = 'Bearer ' + response.body;
		});
		afterAll(async () => {
			const result = await store.delete('2');
		});

		it('Create method should add a user', async () => {
			const result = await store.create({
				firstname: 'Flor',
				lastname: 'Lopez',
				username: 'flopez_test',
				password: 'password123',
				role_id: 1,
			} as User);
			expect(result.user_id).toBe(2);
			expect(result.firstname).toBe('Flor');
			expect(result.lastname).toBe('Lopez');
			expect(result.username).toBe('flopez_test');
			expect(result.role_id).toBe(1);
		});
		it('This method get all users from DB', async () => {
			const response = await request.get('/users').set('Authorization', token);
			expect(response.status).toEqual(200);
		});
		it('This method get one user from DB', async () => {
			const response = await request.get('/users/2').set('Authorization', token);
			expect(response.status).toBe(200);
		});
		it('This method delete one user from DB', async () => {
			const response = await request.delete('/users/2').set('Authorization', token);
			expect(response.status).toBe(200);
		});
	});
});
