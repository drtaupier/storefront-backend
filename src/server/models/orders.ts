import Client from '../database';

export type Order = {
	orders_id?: number;
	status_id?: number;
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
			throw new Error(`Could not find order ${orders_id}. Error: ${error}`);
		}
	}

	async getbyUser(user_id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE user_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find the user ${user_id}`);
		}
	}

	async create(o: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO orders (status_id, user_id) VALUES ($1, $2) RETURNING *';
			const conn = await Client.connect();
			const result = await conn.query(sql, [o.status_id, o.user_id]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (error) {
			throw new Error(`Cannot create the order ${o.orders_id}. Error: ${error}`);
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
