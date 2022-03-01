import {ICategory} from './category.interface';
import {IPaginate} from './paginate.interface';

export interface IRepository<T>{
    create( data: T): Promise<T>;

    save(data: T): Promise<T>;

    index(): Promise<IPaginate<T[]>>;

    findById(id: string): Promise<T | undefined>;

    findByEmail(email: string): Promise<T | undefined>;

    findByName(name: string): Promise<T | undefined>;

    findByCategory(category: ICategory): Promise<T | undefined>;

    findByParentId(parent_id: string): Promise<T | undefined>
}