import bodyParser from 'body-parser';
import { config as dotenv } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/api/user';
dotenv();

const app: express.Application = express();

app.use(bodyParser.json());

const port = process.env.PORT ?? 3000;
morgan('tiny');

userRoutes(app);

app.listen(port, () => {
	console.log(`Server started at localhost ${port}`);
});
