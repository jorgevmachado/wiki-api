import { container } from 'tsyringe';
import {IRepository} from '../../interfaces/repository.interface';
import UserRepository from '../../repositories/user.repository';
import {IUser} from '../../interfaces/user.interface';
import ArticleRepository from '../../repositories/article.repository';
import {IArticle} from '../../interfaces/article.interface';

container.registerSingleton<IRepository<IUser>>('UserRepository', UserRepository );
container.registerSingleton<IRepository<IArticle>>('ArticleRepository', ArticleRepository );