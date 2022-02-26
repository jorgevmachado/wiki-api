import {IBase} from './base.interface';

export interface ICategory extends IBase {
    name: string;
    parent_id: string;
}