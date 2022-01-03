import { Product, ProductStore } from '../products';
const store = new ProductStore();

describe('Product Model', function () {
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

	it('Show method should return the correct product', async () => {
		const result = await store.show('1');
		expect(result).toEqual({
			product_id: 1,
			name: 'Coffee Americano',
			price: 4.99,
		});
	});
});
