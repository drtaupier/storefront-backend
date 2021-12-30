import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';

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
		const order: Order = {
			product_id: req.body.product_id,
			quantity: req.body.quantity,
			status_id: req.body.status_id,
			user_id: req.body.user_id,
		};
		const newOrder = await store.create(order);
		res.status(201).json(newOrder);
	} catch (error) {
		res.status(400).json(error);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const order = await store.delete(req.params.order_id);
		res.json({
			status: 'ok',
			msg: 'Deleted',
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

const productRoutes = (app: express.Application) => {
	app.get('/orders', index);
	app.get('/orders/:orders_id', show);
	app.post('/orders', create);
	app.post('/orders/:product_id', destroy);
};

export default productRoutes;