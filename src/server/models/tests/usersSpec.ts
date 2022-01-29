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

		const drtaupier = {
			firstname: 'David',
			lastname: 'Rivera',
			username: 'drtaupier_test',
			password: 'password123',
			role_id: 1,
		} as User;

		const jpinedo = {
			firstname: 'Jackie',
			lastname: 'Pinedo',
			username: 'jpinedo_test',
			password: 'password123',
			role_id: 2,
		} as User;

		const psw = async (user: User) => {
			const firstname = user.firstname;
			const lastname = user.lastname;
			const username = user.username;
			const password = user.password;
			const role_id = user.role_id;

			const hash = await store.authenticate(user.username, user.password);
			return hash;
		};

		beforeAll(async () => {
			const createUser = await store.create(drtaupier);
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
			const deleteUser = await store.delete('3');
		});

		it('Create method should add a user', async () => {
			const result = await request.post('/users/register').send({
				firstname: 'Flor',
				lastname: 'Lopez',
				username: 'flopez_test',
				password: 'password123',
				role_id: 1,
			});

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
			const response = await request.delete('/users/4').set('Authorization', token);
			expect(response.status).toBe(200);
		});

		describe('Users handlers', () => {
			it('This method should create a user', async () => {
				const result = await store.create({
					firstname: 'Jackie',
					lastname: 'Pinedo',
					username: 'jpinedo_test',
					password: 'password123',
					role_id: 2,
				});
				const hash = await store.authenticate(jpinedo.username, jpinedo.password);
				expect(result).toEqual({
					firstname: 'Jackie',
					lastname: 'Pinedo',
					username: 'jpinedo_test',
					password: hash,
					role_id: 2,
				});
			});
			it('This method should return all users', async () => {
				const result = await store.index();
				const hash: string = await store.authenticate(
					drtaupier.username,
					drtaupier.password
				);
				const hash1: string = await store.authenticate(
					jpinedo.username,
					jpinedo.password
				);
				expect(result).toEqual(hash, hash1);
			});
			it('This method should return a specific user', async () => {
				const result = await store.show('5');
				expect(result.user_id).toBe(5);
				expect(result.firstname).toBe('Jackie');
				expect(result.lastname).toBe('Pinedo');
				expect(result.username).toBe('jpinedo_test');
				expect(result.role_id).toBe(2);
			});
		});
	});
});
