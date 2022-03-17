import {IRepository} from '../interfaces/repository.interface';
import {Repository} from 'typeorm';
import {IPaginate} from '../interfaces/paginate.interface';
import {ICategory} from '../interfaces/category.interface';
import AppError from '@shared/errors/app.error';
import {IUser} from '../interfaces/user.interface';

export class BaseRepository<I> implements IRepository<I> {

    constructor(protected repository: Repository<I>) {}

    async index(): Promise<IPaginate<I[]>> {
        const data = await this.repository.createQueryBuilder().paginate();
        return data as IPaginate<I[]>;
    }

    async find(): Promise<I[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<I | undefined> {
        return await this.repository.findOne({ where: { id} });
    }

    async findByEmail(email: string): Promise<I | undefined> {
        return await this.repository.findOne({ where: { email }});
    }

    async findByName(name: string): Promise<I | undefined> {
        return await this.repository.findOne({ where: { name }});
    }

    async findByParentId(parent_id: string): Promise<I | undefined> {
        return await this.repository.findOne({ where: { parent_id }});
    }

    async findByToken(token: string): Promise<I | undefined> {
        throw new AppError('Not Implement yet!');
    }

    async generate(user: IUser): Promise<I> {
        throw new AppError('Not Implement yet!');
    }

    async findOneByCategory(category: ICategory): Promise<I | undefined> {
        throw new AppError('Not Implement yet!');
    }

    async findByCategory(category: ICategory): Promise<I[] | undefined> {
        throw new AppError('Not Implement yet!');
    }

    async create(data: I): Promise<I> {
        throw new AppError('Not Implement yet!');
    }

    async save(data: I): Promise<I> {
        throw new AppError('Not Implement yet!');
    }

}