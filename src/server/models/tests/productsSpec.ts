import client from '../../database';
import { Product, ProductStore } from '../products';
const store = new ProductStore();
import { User, UserStore } from '../user';
const userStore = new UserStore();
import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);

describe('Product Model', () => {
	describe('Test method exists', () => {
		it('should have an index method', () => {
			expect(store.index).toBeDefined();
		});
		it('Should have a show method', () => {
			expect(store.show).toBeDefined();
		});
		it('Should have a create method', () => {
			expect(store.create).toBeDefined();
		});
		it('Should have a delete method', () => {
			expect(store.delete).toBeDefined();
		});
	});

	describe('Product models', () => {
		let token: string;
		const user = {
			firstname: 'David',
			lastname: 'Rivera',
			username: 'drtaupier_test',
			password: 'password123',
			role_id: 1,
		} as User;

		beforeAll(async () => {
			await userStore.create(user);
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
			await userStore.delete('2');
			await store.delete('2');
		});

		it('This model should create a product', async () => {
			const response = await request
				.post('/products')
				.send({
					name: 'Basil, Tomato and mozzarella sandwich',
					price: 5,
				})
				.set('Authorization', token);
			expect(response.status).toEqual(201);
		});
		it('This model should get all the products', async () => {
			const response = await request.get('/products').set('Authorization', token);
			expect(response.status).toEqual(200);
		});
		it('This method should get a specific product', async () => {
			const response = await request.get('/products/1').set('Authorization', token);
			expect(response.status).toEqual(200);
		});
		it('This method should remove a specific product', async () => {
			const response = await request
				.delete('/products/1')
				.set('Authorization', token);
			expect(response.status).toEqual(200);
		});
	});

	describe('Handle model', () => {
		it('Create method should add a product', async () => {
			const result = await store.create({
				name: 'Tuna sandwich',
				price: 5,
			});
			expect(result).toEqual({
				product_id: 2,
				name: 'Tuna sandwich',
				price: 5,
			});
		});

		it('Show method should return a specific product', async () => {
			const result = await store.show('2');
			expect(result).toEqual({
				product_id: 2,
				name: 'Tuna sandwich',
				price: 5,
			});
		});

		it('Index method should return a list of products', async () => {
			const result = await store.index();
			expect(result).toEqual([
				{
					product_id: 2,
					name: 'Tuna sandwich',
					price: 5,
				},
			]);
		});
		it('Delete method should remove a producto from the list', async () => {
			store.delete('2');
			const result = await store.index();
			expect(result).toEqual([]);
		});
	});
});
