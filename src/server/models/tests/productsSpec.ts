import { Product, ProductStore } from '../products';
const store = new ProductStore();
import { User, UserStore } from '../user';
const userStore = new UserStore();

describe('Product Model', function () {
	beforeAll(async () => {
		const result = await userStore.create({
			firstname: 'David',
			lastname: 'Rivera',
			username: 'drtaupier',
			password: 'password123',
			role_id: 1,
		});
	});

	it('should have an index method', function () {
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
			name: 'Coffee Americano',
			price: 4.99,
		});
		expect(result).toEqual({
			product_id: 1,
			name: 'Coffee Americano',
			price: 4.99,
		});
	});

	it('index method should return a list of products', async () => {
		const result = await store.show('1');
		expect(result).toEqual({
			product_id: 1,
			name: 'Coffee Americano',
			price: 4.99,
		});
	});
});
