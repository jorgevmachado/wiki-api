import {getRepository, Repository} from 'typeorm';
import {Category} from '../entities/category';
import {ICategory} from '../interfaces/category.interface';
import {IRepository} from '../interfaces/repository.interface';
import {IPaginate} from '../interfaces/paginate.interface';

export default class CategoryRepository implements IRepository<ICategory> {

    private repository: Repository<ICategory>;

    constructor() {
        this.repository = getRepository(Category)
    }

    async findById(id: string): Promise<ICategory | undefined> {
        return await this.repository.findOne({ where: { id }});
    }

    async findByName(name: string): Promise<ICategory | undefined> {
        return await this.repository.findOne({ where: { name }});
    }

    async findByParentId(parent_id: string): Promise<ICategory | undefined> {
        return await this.repository.findOne({ where: { parent_id }});
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

    async index(): Promise<IPaginate<ICategory[]>> {
        const data = await this.repository.createQueryBuilder().paginate();
        return data as IPaginate<ICategory[]>;
    }

    findByCategory(category: ICategory): Promise<ICategory | undefined> {
        return Promise.resolve(undefined);
    }

    findByEmail(email: string): Promise<ICategory | undefined> {
        return Promise.resolve(undefined);
    }

    async find(): Promise<ICategory[]> {
        return await this.repository.find();
    }



}