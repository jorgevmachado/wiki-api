import {IBase} from './base.interface';

export interface IUser extends IBase {
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    admin?: boolean;
}