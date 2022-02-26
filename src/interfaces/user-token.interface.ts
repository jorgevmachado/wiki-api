import {IUser} from './user.interface';

export interface IUserToken {
    token: string;
    user: IUser;
}