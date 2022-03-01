import {IBase} from './base.interface';
import {IUser} from './user.interface';
import {ICategory} from './category.interface';

export interface IArticle extends IBase {
    name: string;
    description: string;
    image_url?: string;
    content: string;
    user: IUser;
    category: ICategory;
}


