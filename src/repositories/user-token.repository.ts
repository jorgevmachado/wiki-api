import {EntityRepository, Repository} from 'typeorm';
import {UserToken} from '../entities/user-token';
import {IUser} from '../interfaces/user.interface';

@EntityRepository(UserToken)
export default class UserTokenRepository extends Repository<UserToken>{

    async findByToken(token: string): Promise<UserToken | undefined> {
        return await this.findOne({ where: { token }, relations: ['user']});
    }

    async generate(user: IUser): Promise<UserToken> {
        const userToken = await this.create({user});
        await this.save(userToken);
        return userToken;
    }
}