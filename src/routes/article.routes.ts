import {Router} from 'express';
import CategoriesController from '../controllers/articles.controller';
import isAuthenticated from '@core/middlewares/auth.middleware';
import {celebrate, Joi, Segments} from 'celebrate';
import ArticlesController from '../controllers/articles.controller';

const articlesRouter = Router();
const controller = new ArticlesController();

articlesRouter.use(isAuthenticated);

articlesRouter.get('/', controller.index);

articlesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().required(),
            content: Joi.string().required(),
            category_id: Joi.string().required(),
        }
    }),
    controller.create
);


articlesRouter.put(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().required(),
            content: Joi.string().required(),
            category_id: Joi.string().required(),
        },
    }),
    controller.update
);


articlesRouter.get(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.show
);

articlesRouter.delete(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.delete
);

export default articlesRouter;