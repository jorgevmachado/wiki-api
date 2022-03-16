import {IBase} from './base.interface';

export interface IStat extends IBase{
    users: number;
    categories: number;
    articles: number;
}