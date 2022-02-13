import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import userRoutes from './handlers/user';
import productRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';
import orders_productsRoutes from './handlers/orders_products';
const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello World');
});

userRoutes(app);
productRoutes(app);
ordersRoutes(app);
orders_productsRoutes(app);

app.listen(port, () => {
	console.log(`Server started at localhost ${port}`);
});

export default app;
