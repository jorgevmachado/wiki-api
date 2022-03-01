import {getRepository, Repository} from 'typeorm';
import {Article} from '../entities/article';
import {ICategory} from '../interfaces/category.interface';
import {IArticle} from '../interfaces/article.interface';
import {IRepository} from '../interfaces/repository.interface';
import {IPaginate} from '../interfaces/paginate.interface';
import {IUser} from '../interfaces/user.interface';


export default class ArticleRepository implements IRepository<IArticle> {

    private repository: Repository<IArticle>;

    constructor() {
        this.repository = getRepository(Article);
    }

    async findById(id: string): Promise<IArticle | undefined> {
        return await this.repository.findOne( id,{ relations: ['user', 'category']});
    }

    async findByName(name: string): Promise<IArticle | undefined> {
        return await this.repository.findOne({ where: { name }});
    }

    async findByCategory(category: ICategory): Promise<IArticle | undefined> {
        return await this.repository.findOne({ where: { category }});
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

    async index(): Promise<IPaginate<IArticle[]>> {
        const data = await this.repository.createQueryBuilder().paginate();
        return data as IPaginate<IArticle[]>;
    }

    async find(): Promise<IArticle[]> {
        return await this.repository.find();
    }

    findByParentId(parent_id: string): Promise<IArticle | undefined> {
        return Promise.resolve(undefined);
    }

    findByEmail(email: string): Promise<IArticle | undefined> {
        return Promise.resolve(undefined);
    }
}