import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type User = {
	user_id?: number;
	firstname?: string;
	lastname?: string;
	username: string;
	password: string;
	role_id?: number;
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
			const conn = await Client.connect();
			const sql =
				'INSERT INTO users (firstname, lastname, username, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
			const hash = bcrypt.hashSync(
				u.password + process.env.PAPPER,
				parseInt(process.env.SALT_ROUNDS as unknown as string)
			);
			const result = await conn.query(sql, [
				u.firstname,
				u.lastname,
				u.username,
				hash,
				u.role_id,
			]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (error) {
			throw new Error(`Cannot create the user ${u.username}. Error: ${error}`);
		}
	}

	async delete(user_id: string): Promise<User> {
		try {
			const sql = 'DELETE FROM users WHERE user_id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [user_id]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (error) {
			throw new Error(`Could not delete book ${user_id}. Error: ${error}`);
		}
	}

	async authenticate(username: string, password: string): Promise<string> {
		const conn = await Client.connect();
		const sql = 'SELECT password from users WHERE username=($1)';
		const result = await conn.query(sql, [username]);
		console.log(result);
		if (result.rows.length) {
			const newUser = result.rows[0];
			if (bcrypt.compareSync(password + process.env.PAPPER, newUser.password)) {
				return newUser;
			} else {
				throw new Error('The password is wrong, please try again.');
			}
		}
		throw new Error('Invalid username, please try again.');
	}
}

export default UserStore;
