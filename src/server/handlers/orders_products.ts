import express, { Request, Response } from 'express';
import {
	Orders_products,
	Orders_productsStore,
} from '../models/orders_products';
import verifyAuthToken from '../middlewares/auth';

const store = new Orders_productsStore();

const index = async (_req: Request, res: Response) => {
	try {
		const orders = await store.index();
		res.status(200).json(orders);
	} catch (error) {
		res.status(400).json(error);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const orders = await store.show(req.params.orders_products_id);
		res.json(orders);
	} catch (error) {
		res.status(400).json(error);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const order: Orders_products = {
			quantity: req.body.quantity,
			orders_id: req.body.orders_id,
			product_id: req.body.product_id,
		};
		const newOrder = await store.create(order);
		res.status(201).json(newOrder);
	} catch (error) {
		res.status(400).json(error);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const order = await store.delete(req.params.orders_products_id);
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json(error);
	}
};

const orders_productsRoutes = (app: express.Application) => {
	app.get('/orders-products', verifyAuthToken, index);
	app.get('/orders-products/:orders_products_id', verifyAuthToken, show);
	app.delete('/orders-products/:orders_products_id', verifyAuthToken, destroy);
	app.post('/orders-products', verifyAuthToken, create);
};

export default orders_productsRoutes;
