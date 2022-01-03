import jasmine from 'jasmine';
import { Product, ProductStore } from '../products';
const store = new ProductStore();

describe('Product Model', function () {
	it('should have an index method', function () {
		expect(store.index).toBeDefined();
	});
	it('index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				product_id: 1,
				name: 'Coffee Americano',
				price: 4.99,
			},
		]);
	});

	it('show method should return the specific product', async () => {
		const result = await store.show('1');
		expect(result).toEqual({
			product_id: 1,
			name: 'Coffee',
			price: 4.99,
		});
	});

	it('delete method should remove the specific product', async () => {
		store.delete('1');
		const result = await store.index();
		expect(result).toEqual([]);
	});
});
