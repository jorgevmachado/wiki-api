import StatController from '../controllers/stat.controller';
import {Router} from 'express';
import isAuthenticated from '@core/middlewares/auth.middleware';

const statsRouter = Router();
const controller = new StatController();

statsRouter.use(isAuthenticated);

statsRouter.get('/', controller.index);

export default statsRouter;