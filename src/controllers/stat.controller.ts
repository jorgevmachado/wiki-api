import {Request, Response} from 'express';
import {container} from 'tsyringe';
import {StatService} from '../services/stat.service';

export default class StatController {
    async index(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(StatService);
        const data = await service.index();
        return response.json(data);
    }
}
