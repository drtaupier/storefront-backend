import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import verifyAuthToken from '../middlewares/auth';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
	const orders = await store.index();
	res.json(orders);
};

const show = async (req: Request, res: Response) => {
	const orders = await store.show(req.params.orders_id);
	res.json(orders);
};

const create = async (req: Request, res: Response) => {
	try {
		const userId: number = parseInt(req.params.user_id);
		const order: Order = {
			status_id: 1,
			user_id: userId,
		};
		const newOrder = await store.create(order);
		res.status(201).json(newOrder);
	} catch (error) {
		res.status(400).json(error);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const order = await store.delete(req.params.orders_id);
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json(error);
	}
};

const ordersRoutes = (app: express.Application) => {
	app.get('/orders', verifyAuthToken, index);
	app.get('/orders/:orders_id', verifyAuthToken, show);
	app.post('/orders/:user_id', verifyAuthToken, create);
	app.delete('/orders/:orders_id', verifyAuthToken, destroy);
};

export default ordersRoutes;
