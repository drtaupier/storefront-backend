import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import verifyAuthToken from '../middlewares/auth';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
	const products = await store.index();
	res.json(products);
};

const show = async (req: Request, res: Response) => {
	const product = await store.show(req.params.product_id);
	res.json(product);
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
	const product = await store.delete(req.params.product_id);
	console.log(product);
	res.json(product);
};

const productRoutes = (app: express.Application) => {
	app.get('/products', verifyAuthToken, index);
	app.get('/products/:product_id', verifyAuthToken, show);
	app.post('/products', verifyAuthToken, create);
	app.post('/products/:product_id', verifyAuthToken, destroy);
};

export default productRoutes;
