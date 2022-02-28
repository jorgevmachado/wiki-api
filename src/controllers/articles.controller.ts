import {Request, Response} from 'express';
import {ArticleService} from '../services/article.service';

export default class ArticlesController {

    async create(request: Request, response: Response): Promise<Response> {
        const service = new ArticleService();
        const user_id  = request.user.id;
        const {
            name,
            description,
            content,
            image_url,
            category_id,
        } = request.body;
        const data = await service.create(
            name,
            description,
            content,
            image_url,
            category_id,
            user_id
        );
        return response.json(data);
    }
    async index(request: Request, response: Response): Promise<Response> {
        const service = new ArticleService();
        const data = await service.index();
        return response.json(data);
    }
    async update(request: Request, response: Response): Promise<Response> {
        const service = new ArticleService();
        const user_id  = request.user.id;
        const { id } = request.params;
        const { name,
            description,
            content,
            image_url,
            category_id } = request.body;
        const data = await service.update(
            id,
            name,
            description,
            content,
            image_url,
            category_id,
            user_id
        );
        return response.json(data);
    }
    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = new ArticleService();
        const data = await service.show(id);
        return response.json(data);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = new ArticleService();
        await service.delete(id);
        return response.json([]);
    }
}