import client from '../../database';
import { Product, ProductStore } from '../products';
const store = new ProductStore();
import { User, UserStore } from '../user';
const userStore = new UserStore();

describe('Product Model', function () {
	const user = {
		firstname: 'David',
		lastname: 'Rivera',
		username: 'drtaupier_test',
		password: 'password123',
		role_id: 1,
	} as User;
	const product = {
		name: 'Coffee Americano',
		price: 4,
	} as Product;

	beforeAll(async () => {
		const createProduct = await store.create(product);
		const createUser = await userStore.create(user);
	});
	afterAll(async () => {
		const deleteUser = await userStore.delete('2');
		const deleteProduct = await store.delete('1');
	});
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
		const result = await store.show('1');
		expect(result).toEqual({
			product_id: 1,
			name: 'Coffee Americano',
			price: 4,
		});
	});

	it('Index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				product_id: 1,
				name: 'Coffee Americano',
				price: 4,
			},
			{
				product_id: 2,
				name: 'Tuna sandwich',
				price: 5,
			},
		]);
	});
});
