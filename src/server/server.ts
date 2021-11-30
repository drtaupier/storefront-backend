import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user';
import morgan from 'morgan';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello World');
});

userRoutes(app);

app.listen(port, () => {
	console.log(`Server started at localhost ${port}`);
});
