import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import verifyAuthToken from '../middlewares/auth';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
	try {
		const products = await store.index();
		res.json(products);
	} catch (error) {
		res.status(400).json(error);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const product = await store.show(req.params.product_id);
		res.json(product);
	} catch (error) {
		res.status(400).json(error);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const product: Product = {
			name: req.body.name,
			price: req.body.price,
		};
		const newProduct = await store.create(product);
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(400).json(error);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const product = await store.delete(req.params.product_id);
		console.log(product);
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json(error);
	}
};

const productRoutes = (app: express.Application) => {
	app.get('/products', verifyAuthToken, index);
	app.get('/products/:product_id', verifyAuthToken, show);
	app.post('/products', verifyAuthToken, create);
	app.delete('/products/:product_id', verifyAuthToken, destroy);
};

export default productRoutes;
