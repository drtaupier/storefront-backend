import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
	const users = await store.index();
	res.json(users);
};

const show = async (req: Request, res: Response) => {
	const user = await store.show(req.body.id);
	res.json(show);
};

const create = async (req: Request, res: Response) => {
	try {
		const user: User = {
			name: req.body.name,
			lastname: req.body.lastname,
			username: req.body.username,
			password: req.body.password,
			role: req.body.role,
			active: req.body.active,
			id: req.body.id,
		};

		const newUser = await store.create(user);
		res.json(newUser);
	} catch (error) {
		res.status(400).json(error);
	}
	const user = await store.create(req.body);
};

const destroy = async (req: Request, res: Response) => {
	const user = await store.delete(req.body.id);
	res.json({
		status: 'ok',
		msg: 'Deleted',
	});
};

const userRoutes = (app: express.Application) => {
	app.get('/users', index);
	app.get('users/:id', show);
	app.post('/users', create);
	app.post('/users/:id', destroy);
};

export default userRoutes;
