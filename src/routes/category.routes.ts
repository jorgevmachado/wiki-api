import {Router} from 'express';
import CategoriesController from '../controllers/categories.controller';
import isAuthenticated from '@core/middlewares/auth.middleware';
import {celebrate, Joi, Segments} from 'celebrate';

const categoriesRouter = Router();
const controller = new CategoriesController();

categoriesRouter.use(isAuthenticated);

categoriesRouter.get('/', controller.index);

categoriesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            parent_id: Joi.string().optional(),
        }
    }),
    controller.create
);


categoriesRouter.put(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            parent_id: Joi.string().optional(),
        },
    }),
    controller.update
);


categoriesRouter.get(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.show
);

export default categoriesRouter;