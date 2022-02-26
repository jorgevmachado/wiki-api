import {getCustomRepository} from 'typeorm';
import {ICategory} from '../interfaces/category.interface';
import CategoryRepository from '../repositories/category.repository';
import {IPaginate} from '../interfaces/paginate.interface';
import {Category} from '../entities/category';
import AppError from '@shared/errors/app.error';

export class CategoryService {

    async create(name: string, parent_id?: string): Promise<ICategory> {
        const repository = getCustomRepository(CategoryRepository);
        const data  =  repository.create({name, parent_id});
        await repository.save(data);
        return data;
    }

    async index(): Promise<IPaginate<Category>> {
        const repository = getCustomRepository(CategoryRepository);
        const data = await repository.createQueryBuilder().paginate();
        return data as IPaginate<Category>;
    }

    async update(id: string, name: string, parent_id: string): Promise<ICategory> {
        const repository = getCustomRepository(CategoryRepository);
        const data = await repository.findById(id);

        if(!data) {
            throw new AppError('Category not found.');
        }

        data.name = name;
        data.updated_at = new Date();

        if(parent_id) {
            data.parent_id = parent_id;
        }

        await repository.save(data);
        return data;
    }

    async show(id: string): Promise<ICategory> {
        const repository = getCustomRepository(CategoryRepository);
        const data = await repository.findById(id);

        if(!data) {
            throw new AppError('Category not found.');
        }
        return data;
    }
}