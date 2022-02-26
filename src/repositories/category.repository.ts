import {EntityRepository, Repository} from 'typeorm';
import {Category} from '../entities/category';

@EntityRepository(Category)
export default class CategoryRepository extends Repository<Category> {

    async findById(id: string): Promise<Category | undefined> {
        return await this.findOne({ where: { id }});
    }

    async findByName(name: string): Promise<Category | undefined> {
        return await this.findOne({ where: { name }});
    }
}