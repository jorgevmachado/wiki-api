import 'reflect-metadata';
import 'dotenv/config';
import express from "express";
import 'express-async-errors'
import cors from 'cors';
import {errors} from 'celebrate';
import {pagination} from 'typeorm-pagination';
import routes from './routes';
import './core/database/typeorm';
import errorsMiddleware from '@core/middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination);

app.use(routes);

app.use(errors());

app.use(errorsMiddleware);

app.listen(3333, () => {
   console.log('Server started on port 3333!');
});