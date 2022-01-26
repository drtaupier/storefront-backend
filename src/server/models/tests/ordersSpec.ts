import { User, UserStore } from '../user';
import { Order, OrderStore } from '../orders';
import { Product, ProductStore } from '../products';
import supertest from 'supertest';
import app from '../../server';
const userStore = new UserStore();
const productStore = new ProductStore();
const store = new OrderStore();
const request = supertest(app);

describe('Orders model', () => {
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
	});
	describe('Test orders model logic', () => {
		let token: string;
		const user = {
			firstname: 'David',
			lastname: 'Rivera',
			username: 'drtaupier_test',
			password: 'password123',
			role_id: 1,
		} as User;

		const product = {
			name: 'Ham sandwich',
			price: 5,
		} as Product;

		beforeAll(async () => {
			const createUser = await userStore.create(user);
			const createProducto = await productStore.create(product);
			const auth = await request
				.post('/user/login')
				.send({
					username: 'drtaupier_test',
					password: 'password123',
				})
				.set('Accept', 'application/json');
			token = 'Bearer ' + auth.body;
		});
		afterAll(async () => {
			const deleteUser = await userStore.delete('1');
			const deleteProduct = await productStore.delete('1');
		});

		it('Create method should add a order', async () => {
			const result = await request
				.post('/orders')
				.send({
					status_id: 1,
					user_id: 1,
				})
				.set('Authorization', token);
			expect(result.status).toEqual(201);
		});
		it('This method get all orders from DB', async () => {
			const result = await request.get('/orders').set('Authorization', token);
			expect(result.status).toEqual(200);
		});
		it('This method get one specific order', async () => {
			const result = await request.get('/orders/1').set('Authorization', token);
			expect(result.status).toEqual(200);
		});
	});
});
