import {User} from '../entities/user';
import {getRepository, Repository} from 'typeorm';
import {IUser} from '../interfaces/user.interface';
import {IPaginate} from '../interfaces/paginate.interface';
import {IRepository} from '../interfaces/repository.interface';
import {ICategory} from '../interfaces/category.interface';

export default class UserRepository implements IRepository<IUser> {
    private repository: Repository<IUser>;
    constructor() {
        this.repository = getRepository(User);
    }

    async create(data: IUser): Promise<IUser> {
        const {name, email, password } = data;
        const obj = this.repository.create({
            name,
            email,
            password,
            admin: false
        });
        await this.repository.save(obj);
        return obj;
    }

    async save(data: IUser): Promise<IUser> {
        await this.repository.save(data);
        return data;
    }

    async index(): Promise<IPaginate<IUser[]>> {
        const data = await this.repository.createQueryBuilder().paginate();
        return data as IPaginate<IUser[]>;
    }


    async findById(id: string): Promise<IUser | undefined> {
        return await this.repository.findOne({ where: { id} });
    }

    async findByEmail(email: string): Promise<IUser | undefined> {
        return await this.repository.findOne({ where: { email }});
    }

    async findByName(name: string): Promise<IUser | undefined> {
        return await this.repository.findOne({ where: { name }});
    }

    findByCategory(category: ICategory): Promise<IUser | undefined> {
        return Promise.resolve(undefined);
    };

    findByParentId(parent_id: string): Promise<IUser | undefined> {
        return Promise.resolve(undefined);
    }

    async find(): Promise<IUser[]> {
        return await this.repository.find();
    }
}