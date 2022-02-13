import { User, UserStore } from '../user';
import supertest from 'supertest';
const store = new UserStore();
import app from '../../server';
const request = supertest(app);
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

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

		const jpinedo = {
			//user_id: 3,
			firstname: 'Jackie',
			lastname: 'Pinedo',
			username: 'jpinedo_test',
			password: 'password123',
			role_id: 2,
		} as User;

		const flopez = {
			//user_id: 2,
			firstname: 'Flor',
			lastname: 'Lopez',
			username: 'flopez_test',
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

		it('Create method should add a user', async () => {
			const result = await request.post('/users/register').send(flopez);
			expect(result.status).toEqual(201);
		});
		it('This method get all users from DB', async () => {
			const response = await request.get('/users').set('Authorization', token);
			expect(response.status).toEqual(200);
		});
		it('This method get one user from DB', async () => {
			const response = await request.get('/users/4').set('Authorization', token);
			expect(response.status).toBe(200);
		});
		it('This method delete one user from DB', async () => {
			const response = await request.delete('/users/2').set('Authorization', token);
			expect(response.status).toBe(200);
		});

		describe('Users handlers', () => {
			it('This method should create a user', async () => {
				const result = await store.create(jpinedo);
				expect(result.firstname).toEqual('Jackie');
				expect(result.lastname).toEqual('Pinedo');
				expect(result.username).toEqual('jpinedo_test');
				expect(
					bcrypt.compareSync('password123' + process.env.PAPPER, result.password)
				).toBeTruthy();
			});
			it('This method should return all users', async () => {
				const result = await store.index();
				expect(result.length).toEqual(2);
			});

			it('This method should return a specific user', async () => {
				const result = await store.show('3');
				expect(result.user_id).toBe(3);
				expect(result.firstname).toBe('Jackie');
				expect(result.lastname).toBe('Pinedo');
				expect(result.username).toBe('jpinedo_test');
			});
			it('This method should remove a specific user', async () => {
				store.delete('3');
				const result = await store.index();
				expect(result.length).toEqual(1);
			});
		});
	});
});
