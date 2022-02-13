import Client from '../database';

export type Orders_products = {
	orders_products_id?: number;
	quantity: number;
	orders_id: number;
	product_id: number;
};

export class Orders_productsStore {
	async index(): Promise<Orders_products[]> {
		try {
			const conn = await Client.connect();
			const sql =
				'SELECT o.orders_id, op.quantity, p.name, p.price, os.order_status, u.username FROM orders_products AS op INNER JOIN orders AS o ON op.orders_id=o.orders_id JOIN products AS p ON op.product_id=p.product_id JOIN order_status AS os ON o.status_id=os.status_id JOIN users AS u ON o.user_id=u.user_id';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`Cannot get the orders. ${error}`);
		}
	}

	async show(orders_products_id: string): Promise<Orders_products> {
		try {
			const sql =
				'SELECT o.orders_id, op.orders_products_id, op.quantity, p.name, p.price, os.order_status, u.username FROM orders_products AS op INNER JOIN orders AS o ON op.orders_id=o.orders_id JOIN products AS p ON op.product_id=p.product_id JOIN order_status AS os ON o.status_id=os.status_id JOIN users AS u ON o.user_id=u.user_id AND op.orders_products_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [orders_products_id]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find user ${orders_products_id}. Error: ${error}`);
		}
	}

	async create(op: Orders_products): Promise<Orders_products> {
		try {
			const sql =
				'INSERT INTO orders_products (quantity, orders_id, product_id) VALUES ($1, $2, $3) RETURNING *';
			const conn = await Client.connect();
			const result = await conn.query(sql, [
				op.quantity,
				op.orders_id,
				op.product_id,
			]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (error) {
			throw new Error(
				`Cannot create the order ${op.orders_products_id}. Error: ${error}`
			);
		}
	}

	async delete(orders_products_id: string): Promise<Orders_products> {
		try {
			const sql = 'DELETE FROM orders_products WHERE orders_products_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [orders_products_id]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (error) {
			throw new Error(`Could not delete book ${orders_products_id}. Error: ${error}`);
		}
	}
}

export default Orders_productsStore;
