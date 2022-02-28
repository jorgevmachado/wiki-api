import 'reflect-metadata';
import 'dotenv/config';
import express, {NextFunction, Request, Response} from "express";
import 'express-async-errors'
import cors from 'cors';
import {errors} from 'celebrate';
import {pagination} from 'typeorm-pagination';
import routes from './routes';
import './core/database/typeorm';
import errorsMiddleware from '@core/middlewares/error.middleware';
import AppError from '@shared/errors/app.error';

const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination);

app.use(routes);

app.use(errors());

// app.use(errorsMiddleware);

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
       if(error instanceof AppError) {
          return response
              .status(error.statusCode)
              .json({
                     status: 'error',
                     message: error.message
                  }
              );
       }
       return response
           .status(500)
           .json({
                  status: 'error',
                  message: 'Internal server error'
               }
           );
    }
);

app.listen(3333, () => {
   console.log('Server started on port 3333!');
});