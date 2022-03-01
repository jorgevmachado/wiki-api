import {getRepository} from 'typeorm';
import {Category} from '../entities/category';
import {ICategory} from '../interfaces/category.interface';
import {BaseRepository} from './base.repository';

export default class CategoryRepository extends BaseRepository<ICategory>{

    constructor() {
        super(getRepository(Category));
    }

    async create(data: ICategory): Promise<ICategory> {
        const { name, parent_id } = data;
        const obj = this.repository.create({
            name,
            parent_id
        });
        await this.repository.save(obj);
        return data;
    }

    async save(data: ICategory): Promise<ICategory> {
        await this.repository.save(data);
        return data;
    }
}