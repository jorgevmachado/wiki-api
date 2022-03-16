import {inject, injectable} from 'tsyringe';
import {IRepository} from '../interfaces/repository.interface';
import {IArticle} from '../interfaces/article.interface';
import {ICategory} from '../interfaces/category.interface';
import {IUser} from '../interfaces/user.interface';
import {IStat} from '../interfaces/stat.interface';

@injectable()
export class StatService {
    constructor(
        @inject('ArticleRepository')
        private articleRepository: IRepository<IArticle>,
        @inject('CategoryRepository')
        private categoryRepository: IRepository<ICategory>,
        @inject('UserRepository')
        private userRepository: IRepository<IUser>
    ) {}

    async index(): Promise<IStat> {
        const getCategories = await this.categoryRepository.find();
        const categories = (!getCategories) ? 0 : getCategories.length;
        const getArticles = await this.articleRepository.find();
        const articles = (!getArticles) ? 0 : getArticles.length;
        const getUsers = await this.userRepository.find();
        const users = (!getUsers) ? 0 : getUsers.length;
        const id = `0${articles}${categories}${users}`;
        const created_at = new Date;
        return {
            id,
            articles,
            categories,
            users,
            created_at
        }
    }
}