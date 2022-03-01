import { container } from 'tsyringe';
import {IRepository} from '../../interfaces/repository.interface';
import UserRepository from '../../repositories/user.repository';
import {IUser} from '../../interfaces/user.interface';
import ArticleRepository from '../../repositories/article.repository';
import {IArticle} from '../../interfaces/article.interface';
import {ICategory} from '../../interfaces/category.interface';
import CategoryRepository from '../../repositories/category.repository';

container.registerSingleton<IRepository<IUser>>('UserRepository', UserRepository );
container.registerSingleton<IRepository<IArticle>>('ArticleRepository', ArticleRepository );
container.registerSingleton<IRepository<ICategory>>('CategoryRepository', CategoryRepository );