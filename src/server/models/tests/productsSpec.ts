import client from '../../database';
import { Product, ProductStore } from '../products';
const store = new ProductStore();
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

		it('This model should create a product', async () => {
			const response = await request
				.post('/products')
				.set('Authorization', token)
				.send({
					// product_id:2,
					name: 'Basil, Tomato and mozzarella sandwich',
					price: 5,
				});
			expect(response.status).toEqual(201);
		});
		it('This model should get all the products', async () => {
			const response = await request.get('/products').set('Authorization', token);
			expect(response.status).toEqual(200);
		});
		it('This method should get a specific product', async () => {
			const response = await request.get('/products/2').set('Authorization', token);
			expect(response.status).toEqual(200);
		});
		it('This method should remove a specific product', async () => {
			const response = await request
				.delete('/products/2')
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
				product_id: 3,
				name: 'Tuna sandwich',
				price: 5,
			});
		});

		it('Show method should return a specific product', async () => {
			const result = await store.show('3');
			expect(result).toEqual({
				product_id: 3,
				name: 'Tuna sandwich',
				price: 5,
			});
		});

		it('Index method should return a list of products', async () => {
			const result = await store.index();
			expect(result).toEqual([
				{
					product_id: 1,
					name: 'Cafe Latte',
					price: 6,
				},
				{
					product_id: 3,
					name: 'Tuna sandwich',
					price: 5,
				},
			]);
		});
		it('Delete method should remove a producto from the list', async () => {
			store.delete('3');
			const result = await store.index();
			expect(result).toEqual([
				{
					product_id: 1,
					name: 'Cafe Latte',
					price: 6,
				},
			]);
		});
	});
});
