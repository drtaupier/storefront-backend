import Client from '../database';

export type User = {
	user_id?: number;
	firstname: string;
	lastname: string;
	password: string;
};

export class UserStore {
	async index(): Promise<User[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM users';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`Cannot get users. ${error}`);
		}
	}
	async show(user_id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE user_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [user_id]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find user ${user_id}. Error: ${error}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [u.firstname, u.lastname, u.password]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (error) {
			throw new Error(
				`Cannot create the user ${u.firstname} ${u.lastname}. Error: ${error}`
			);
		}
	}

	async delete(user_id: string): Promise<User> {
		try {
			const sql = 'DELETE FROM users WHERE id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [user_id]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (error) {
			throw new Error(`Could not delete book ${user_id}. Error: ${error}`);
		}
	}
}

export default UserStore;
