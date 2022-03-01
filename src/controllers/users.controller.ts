import {Request, Response} from 'express';
import {UserService} from '../services/user.service';
import {instanceToInstance} from 'class-transformer';
import UserRepository from '../repositories/user.repository';
import {container} from 'tsyringe';

export default class UsersController {

    async create(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(UserService);
        const { name, email, password } = request.body;
        const data = await service.create(name, email, password);
        return response.json(instanceToInstance(data));
    }

    async index(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(UserService);
        const data = await service.index();
        return response.json(instanceToInstance(data));
    }

    async update(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(UserService);
        const { id } = request.params;
        const { name, email, admin, password, old_password } = request.body;
        const data = await service.update(
            id,
            name,
            email,
            admin,
            password,
            old_password
        );
        return response.json(instanceToInstance(data));
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = container.resolve(UserService);
        await service.delete(id);
        return response.json([]);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = container.resolve(UserService);
        const data = await service.show(id);
        return response.json(instanceToInstance(data));
    }

    async login(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const service = container.resolve(UserService);
        const data = await service.login(email, password);
        return response.json(instanceToInstance(data));
    }

    async avatar(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(UserService);
        const data = await service.avatar(request.user.id, request.file?.filename as string);
        return response.json(instanceToInstance(data));
    }

    async forgotPassword(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const repository = new UserRepository();
        const service = new UserService(repository);
        const link_email = await service.sendForgotPassword(email);
        return response.json({link_email});
    }

    async resetPassword(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;
        const repository = new UserRepository();
        const service = new UserService(repository);
        await service.resetPassword(password, token);
        return response.status(204).json();
    }

}
