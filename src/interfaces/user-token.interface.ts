import {IUser} from './user.interface';
import {IBase} from './base.interface';

export interface IUserToken extends IBase {
    token: string;
    user?: IUser;
    user_id?: string;
}