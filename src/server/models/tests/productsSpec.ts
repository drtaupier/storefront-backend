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
});
