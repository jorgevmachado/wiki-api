import { Router } from 'express';
import usersRouter from '@routes/user.routes';
import categoriesRouter from '@routes/category.routes';
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello Super Dev!' } );
});
export default routes;