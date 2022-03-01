import {getRepository} from 'typeorm';
import {UserToken} from '../entities/user-token';
import {IUser} from '../interfaces/user.interface';
import {BaseRepository} from './base.repository';
import {IUserToken} from '../interfaces/user-token.interface';

export default class UserTokenRepository extends BaseRepository<IUserToken>{

    constructor() {
        super(getRepository(UserToken));
    }

    async findByToken(token: string): Promise<IUserToken | undefined> {
        return await this.repository.findOne({ where: { token }, relations: ['user']});
    }

    async createUserToken(user: IUser): Promise<IUserToken> {
        const obj =  this.repository.create({user});
        await this.repository.save(obj);
        return obj;
    }

    async generate(user: IUser): Promise<IUserToken> {
        const userToken = await this.createUserToken(user);
        await this.save(userToken);
        return userToken;
    }
}