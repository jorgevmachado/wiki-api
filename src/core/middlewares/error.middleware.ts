import {Request, Response} from 'express';
import AppError from '@shared/errors/app.error';

export default function errorsMiddleware(
    error: Error,
    request: Request,
    response: Response) {
    if (error instanceof AppError) {
        return response
            .status(error.statusCode)
            .json({
                status: 'error',
                message: error.message
            });
    }
    return response
        .status(500)
        .json({
                status: 'error',
                message: 'Internal server error'
            }
        );
}