import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import UsersController from '../controllers/users.controller';
import isAuthenticated from '@core/middlewares/auth.middleware';
import uploadConfig from '@config/upload';
import multer from 'multer';

const usersRouter = Router();
const controller = new UsersController();

const upload = multer(uploadConfig);


usersRouter.get('/', isAuthenticated, controller.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    controller.create
);

usersRouter.post(
    '/login',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    controller.login
);

usersRouter.put(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            admin: Joi.boolean().optional(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required()
                }),
        },
    }),
    controller.update
);

usersRouter.delete(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.delete
);

usersRouter.get(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.show
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    controller.avatar
);

usersRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    controller.forgotPassword
);

usersRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().required().valid(Joi.ref('password')),
        },
    }),
    controller.resetPassword
);

export default usersRouter;