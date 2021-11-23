import express from 'express';
import { User, UserStore } from '../models/user';
const routes = express.Router();

routes.get('/', (req, res) => {
	res.send('Hello World!');
});
