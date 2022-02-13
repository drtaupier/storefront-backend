import { User, UserStore } from '../user';
import { Orders_products, Orders_productsStore } from '../orders_products';
import { Order, OrderStore } from '../orders';
import { Product, ProductStore } from '../products';
import supertest from 'supertest';
const store = new Orders_productsStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
import app from '../../server';
const request = supertest(app);

describe('orders_products model', () => {
	let token: string;
	const user = {
		//user_id: 1,
		firstname: 'David',
		lastname: 'Rivera',
		username: 'drtaupier_test',
		password: 'password123',
		role_id: 1,
	} as User;

	const product = {
		// product_id:1,
		name: 'Cafe Latte',
		price: 6,
	} as Product;

	const order = {
		//order_id: 1,
		status_id: 1,
		user_id: 1,
	} as Order;

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
		await productStore.create(product);
		await orderStore.create(order);
	});

	describe('Test method exist', () => {
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
	describe('orders_products models', () => {
		it('Create model should add a orders_products', async () => {
			const response = await request
				.post('/orders-products')
				.set('Authorization', token)
				.send({
					quantity: 1,
					orders_id: 1,
					product_id: 1,
				});
			expect(response.status).toEqual(201);
		});
		it('This method get all orders_products from DB', async () => {
			const result = await request
				.get('/orders-products')
				.set('Authorization', token);
			expect(result.status).toEqual(200);
		});
		it('This method get one specific orders_product', async () => {
			const result = await request
				.get('/orders-products/1')
				.set('Authorization', token);
			expect(result.status).toEqual(200);
		});
		it('This method shoud remove a specific orders_products', async () => {
			const result = await request
				.delete('/orders-products/1')
				.set('Authorization', token);
			expect(result.status).toEqual(200);
		});
	});

	describe('Test handlers', () => {
		it('Create method should add a orders_products', async () => {
			const result = await store.create({
				quantity: 2,
				orders_id: 1,
				product_id: 1,
			});
			expect(result).toEqual({
				orders_products_id: 2,
				quantity: 2,
				orders_id: 1,
				product_id: 1,
			});
		});
		it('index method should return a list of orders_products', async () => {
			const result = await store.index();
			expect(result.length).toEqual(1);
		});
		it('show method should return a specific orders_products', async () => {
			const result = await store.show('2');
			expect(result.orders_products_id).toEqual(2);
		});
		it('Delete method should remove the order_products', async () => {
			store.delete('2');
			const result = await store.index();
			expect(result).toEqual([]);
		});
	});
});
