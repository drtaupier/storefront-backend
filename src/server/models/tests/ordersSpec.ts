import { User, UserStore } from '../user';
import { Order, OrderStore } from '../orders';
import supertest from 'supertest';
import app from '../../server';
const userStore = new UserStore();
const store = new OrderStore();
const request = supertest(app);

describe('Orders model', () => {
	let token: string;
	const user = {
		firstname: 'David',
		lastname: 'Rivera',
		username: 'drtaupier_test',
		password: 'password123',
		role_id: 1,
	} as User;

	beforeAll(async () => {
		const createUser = await userStore.create(user);
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
		const deleteOrder = await store.delete('2');
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
	describe('Test orders EndPoints', () => {
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

	describe('Test handlers', () => {
		const order = {
			status_id: 1,
			user_id: 1,
		} as Order;

		it('create mehod should add a order', async () => {
			const result = await store.create(order);
			expect(result).toEqual({
				orders_id: 2,
				status_id: 1,
				user_id: 1,
			});
		});
		it('index method should return a list of orders', async () => {
			const result = await store.index();
			expect(result).toEqual([
				{
					orders_id: 1,
					status_id: 1,
					user_id: 1,
				},
				{
					orders_id: 2,
					status_id: 1,
					user_id: 1,
				},
			]);
		});
		it('show method should return a the correct order', async () => {
			const result = await store.show('2');
			expect(result).toEqual({
				orders_id: 2,
				status_id: 1,
				user_id: 1,
			});
		});
		it('delete method should remove the order', async () => {
			store.delete('1');
			const result = await store.index();
			expect(result).toEqual([
				{
					orders_id: 2,
					status_id: 1,
					user_id: 1,
				},
			]);
		});
	});
});
