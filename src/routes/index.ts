import { Router } from 'express';
import usersRouter from '@routes/user.routes';
import categoriesRouter from '@routes/category.routes';
import articlesRouter from '@routes/article.routes';
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/articles', articlesRouter);

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello Super Dev!' } );
});
export default routes;