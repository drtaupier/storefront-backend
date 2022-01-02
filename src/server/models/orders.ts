import Client from '../database';

export type Order = {
	orders_id?: number;
	product_id: number;
	quantity: number;
	status_id: number;
	user_id: number;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`Cannot get users. ${error}`);
		}
	}

	async show(orders_id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE orders_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [orders_id]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find user ${orders_id}. Error: ${error}`);
		}
	}

	async create(o: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO orders (product_id, quantity, status_id, user_id) VALUES ($1, $2, $3, $4)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [
				o.product_id,
				o.quantity,
				o.status_id,
				o.user_id,
			]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (error) {
			throw new Error(`Cannot create the order ${o.product_id}. Error: ${error}`);
		}
	}

	async delete(orders_id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE orders_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [orders_id]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (error) {
			throw new Error(`Could not delete book ${orders_id}. Error: ${error}`);
		}
	}
}

export default OrderStore;
