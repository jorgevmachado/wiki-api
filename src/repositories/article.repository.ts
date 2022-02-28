import {EntityRepository, Repository} from 'typeorm';
import {Article} from '../entities/article';
import {ICategory} from '../interfaces/category.interface';

@EntityRepository(Article)
export default class ArticleRepository extends Repository<Article> {

    async findById(id: string): Promise<Article | undefined> {
        return await this.findOne( id,{ relations: ['user', 'category']});
    }

    async findByName(name: string): Promise<Article | undefined> {
        return await this.findOne({ where: { name }});
    }

    async findByCategory(category: ICategory): Promise<Article | undefined> {
        return await this.findOne({ where: { category }});
    }
}