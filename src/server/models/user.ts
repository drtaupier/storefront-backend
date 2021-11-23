import Client from '../database';
import express, { Request, Response } from 'express';
import { release, userInfo } from 'os';

export type User = {
	id: number;
	name: string;
	lastname: string;
	username: string;
	password: string;
	role: string;
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
	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find user ${id}. Error: ${error}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO users (name, lastname, username, password, role) VALUES ($1, $2, $3, $4, "user_role")';
			const conn = await Client.connect();
			const result = await conn.query(sql, [
				u.name,
				u.lastname,
				u.username,
				u.password,
				u.role,
			]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (error) {
			throw new Error(`Cannot create user ${u.username}. Error: ${error}`);
		}
	}

	async delete(id: string): Promise<User> {
		try {
			const sql = 'DELETE FROM users WHERE id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [id]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (error) {
			throw new Error(`Could not delete book ${id}. Error: ${error}`);
		}
	}
}

export default UserStore;
