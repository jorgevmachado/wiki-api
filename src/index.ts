import 'reflect-metadata';
import 'dotenv/config';
import express, {NextFunction, Request, Response} from "express";
import 'express-async-errors'
import cors from 'cors';
import {errors} from 'celebrate';
import {pagination} from 'typeorm-pagination';
import routes from './routes';
import AppError from '@shared/errors/app.error';
import uploadConfig from '@config/upload';
import './core/database/typeorm';
import '@shared/container';
import errorsMiddleware from '@core/middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(errorsMiddleware);

app.listen(3333, () => {
   console.log('Server started on port 3333!');
});