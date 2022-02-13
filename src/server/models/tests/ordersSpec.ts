import { Order, OrderStore } from '../orders';
import { Product, ProductStore } from '../products';
import { Orders_products, Orders_productsStore } from '../orders_products';
import supertest from 'supertest';
import app from '../../server';

const store = new OrderStore();
const productStore = new ProductStore();
const orderProductStore = new Orders_productsStore();
const request = supertest(app);

describe('Orders model', () => {
	let token: string;
	const order = {
		//order_id : 2,
		status_id: 1,
		user_id: 1,
	} as Order;

	const orderProduct = {
		//orders_products_id: 3,
		quantity: 1,
		orders_id: 1,
		product_id: 1,
	} as Orders_products;

	beforeAll(async () => {
		const auth = await request
			.post('/user/login')
			.send({
				username: 'drtaupier_test',
				password: 'password123',
			})
			.set('Accept', 'application/json');
		token = 'Bearer ' + auth.body;
		// await orderProductStore.create(orderProduct);
	});

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
	describe('Test orders Models', () => {
		it('Create method should add an order', async () => {
			const result = await request
				.post('/orders/1')
				.send(order)
				.set('Authorization', token);
			expect(result.status).toEqual(201);
		});
		it('This method get all orders from DB', async () => {
			const result = await request.get('/orders').set('Authorization', token);
			expect(result.status).toEqual(200);
		});
		it('This method get one specific order', async () => {
			const result = await request.get('/orders/2').set('Authorization', token);
			expect(result.status).toEqual(200);
		});
		it('Delete mothod should remove a specific order', async () => {
			const result = await request.delete('/orders/2').set('Authorization', token);
			expect(result.status).toEqual(200);
		});
	});

	describe('Test handlers', () => {
		it('create method should add a order', async () => {
			const result = await store.create(order);
			expect(result).toEqual({
				orders_id: 3,
				status_id: 1,
				user_id: 1,
			});
		});
		it('index method should return a list of orders', async () => {
			const result = await store.index();
			expect(result.length).toEqual(2);
		});
		it('show method should return a the correct order', async () => {
			const result = await store.show('3');
			expect(result).toEqual({
				orders_id: 3,
				status_id: 1,
				user_id: 1,
			});
		});
		it('delete method should remove the order', async () => {
			store.delete('3');
			const result = await store.index();
			expect(result).toEqual([
				{
					orders_id: 1,
					status_id: 1,
					user_id: 1,
				},
			]);
		});
	});
});
