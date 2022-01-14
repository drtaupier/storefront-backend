import Client from '../database';

export type Product = {
	product_id?: number;
	name: string;
	price: number;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM products';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`Cannot get products. ${error}`);
		}
	}

	async show(product_id: string): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE product_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [product_id]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find product ${product_id}. Error: ${error}`);
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
			const conn = await Client.connect();
			const result = await conn.query(sql, [p.name, p.price]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (error) {
			throw new Error(`Cannot create the product ${p.name}. Error: ${error}`);
		}
	}

	async delete(product_id: string): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE product_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [product_id]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (error) {
			throw new Error(`Could not delete product ${product_id}. Error ${error}`);
		}
	}
}

export default ProductStore;
