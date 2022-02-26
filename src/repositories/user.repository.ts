import {User} from '../entities/user';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(User)
export default class UserRepository extends Repository<User>{

    async findById(id: string): Promise<User | undefined> {
        return await this.findOne({ where: { id} });
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.findOne({ where: { email }});
    }

    async findByName(name: string): Promise<User | undefined> {
        return await this.findOne({ where: { name }});
    }
}