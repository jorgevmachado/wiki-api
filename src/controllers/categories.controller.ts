import {Request, Response} from 'express';
import {CategoryService} from '../services/category.service';

export default class CategoriesController {

    async create(request: Request, response: Response): Promise<Response> {
        const service = new CategoryService();
        const { name, parent_id } = request.body;
        const data = await service.create(name, parent_id);
        return response.json(data);
    }

    async index(request: Request, response: Response): Promise<Response> {
        const service = new CategoryService();
        const data = await service.index();
        return response.json(data);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const service = new CategoryService();
        const { id } = request.params;
        const { name, parent_id } = request.body;
        const data = await service.update(id, name, parent_id);
        return response.json(data);
    }
    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = new CategoryService();
        const data = await service.show(id);
        return response.json(data);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = new CategoryService();
        await service.delete(id);
        return response.json([]);
    }

    async tree(request: Request, response: Response): Promise<Response> {
        const service = new CategoryService();
        const data = await service.tree();
        return response.json(data);
    }

}