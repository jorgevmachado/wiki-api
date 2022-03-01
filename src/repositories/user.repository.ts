import {User} from '../entities/user';
import {getRepository} from 'typeorm';
import {IUser} from '../interfaces/user.interface';
import {BaseRepository} from './base.repository';

export default class UserRepository extends BaseRepository<IUser> {

    constructor() {
        super(getRepository(User));
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
}