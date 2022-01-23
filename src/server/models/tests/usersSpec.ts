import express, { Request, response, Response } from 'express';
import { User, UserStore } from '../user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const store = new UserStore();

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
		const user = {
			firstname: 'David',
			lastname: 'Rivera',
			username: 'drtaupier_test1',
			password: 'password123',
			role_id: 1,
		} as User;

		beforeAll(async () => {
			const response = await store.authenticate(
				user.username,
				user.password as string
			);
		});
		afterAll(async () => {
			const result = await store.delete('1');
		});

		it('Create method should add a user', async () => {
			const result = await store.create({
				firstname: 'Flor',
				lastname: 'Lopez',
				username: 'flopez_test',
				password: 'password123',
				role_id: 1,
			});
			expect(result.firstname).toBe('Flor');
			expect(result.lastname).toBe('Lopez');
			expect(result.username).toBe('flopez_test');
			expect(result.role_id).toBe(1);
		});
	});

	// describe('Users endpoints testing', () => {
	// 	let token: string;
	// 	it('posts to /users endpoint, create a new user', async () => {
	// 		const response = await request
	// 			.post('/users/register')
	// 			.set({ 'API-Key': 'foobar', Accept: 'application/json' })
	// 			.send({
	// 				firstname: 'Flor',
	// 				lastname: 'Lopez',
	// 				username: 'flopez_test',
	// 				password: process.env.POSTGRES_TEST_DB as string,
	// 				role_id: 1,
	// 			});
	// 		token = 'Pass ' + response.body;
	// 		expect(response.status).toEqual(200);
	// 	});

	// 	it('Get "/users" get all the users', async () => {
	// 		const response = await request.get('/users').set('Authorization', token);
	// 		expect(response.status).toEqual(200);
	// 	});
});
