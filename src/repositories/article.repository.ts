import {getRepository} from 'typeorm';
import {Article} from '../entities/article';
import {ICategory} from '../interfaces/category.interface';
import {IArticle} from '../interfaces/article.interface';
import {BaseRepository} from './base.repository';


export default class ArticleRepository extends BaseRepository<IArticle>{

    constructor() {
        super(getRepository(Article));
    }

    async findById(id: string): Promise<IArticle | undefined> {
        return await this.repository.findOne({ where: { id}, relations: ['user', 'category'] });
    }

    async findOneByCategory(category: ICategory): Promise<IArticle | undefined> {
        return await this.repository.findOne({ where: { category }, relations: ['user', 'category']});
    }

    async findByCategory(category: ICategory): Promise<IArticle[] | undefined> {
        return await this.repository.find({ where: { category }, relations: ['user', 'category']});
    }

    async create(data: IArticle): Promise<IArticle> {
        const {
            name,
            description,
            content,
            image_url,
            category,
            user
        } = data;
        const obj = this.repository.create({
            name,
            description,
            content,
            image_url,
            category,
            user
        });
        await this.repository.save(obj);
        return obj;
    }

    async save(data: IArticle): Promise<IArticle> {
        await this.repository.save(data);
        return data;
    }
}