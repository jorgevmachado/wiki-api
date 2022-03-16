import ArticleRepository from '../repositories/article.repository';
import CategoryRepository from '../repositories/category.repository';
import AppError from '@shared/errors/app.error';
import UserRepository from '../repositories/user.repository';
import {IPaginate} from '../interfaces/paginate.interface';
import {IArticle} from '../interfaces/article.interface';
import {inject, injectable} from 'tsyringe';
import {IRepository} from '../interfaces/repository.interface';
import {IUser} from '../interfaces/user.interface';
import {ICategory} from '../interfaces/category.interface';

@injectable()
export class ArticleService {

    constructor(
        @inject('ArticleRepository')
        private repository: IRepository<IArticle>,
        @inject('CategoryRepository')
        private categoryRepository: IRepository<ICategory>,
        @inject('UserRepository')
        private userRepository: IRepository<IUser>
    ) {}

    async create(
        name: string,
        description: string,
        content: string,
        image_url: string,
        category_id: string,
        user_id: string,
    ): Promise<IArticle> {
        const category = await this.categoryRepository.findById(category_id);

        if (!category) {
            throw new AppError('Could not find any category with the given id.');
        }

        const user = await this.userRepository.findById(user_id);

        if(!user) {
            throw new AppError('Could not find any user with the given id.');
        }

        const nameExists = await this.repository.findByName(name);

        if(nameExists) {
            throw new AppError('Article name already used.');
        }

        return await this.repository.create({
            name,
            description,
            content,
            image_url,
            category,
            user,
        });
    }

    async update(
        id: string,
        name: string,
        description: string,
        content: string,
        image_url: string,
        category_id: string,
        user_id: string,
    ): Promise<IArticle> {

        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('Article not found.');
        }

        const nameExists = await this.repository.findByName(name);

        if(nameExists && nameExists.id !== id) {
            throw new AppError('Article name already used.');
        }

        const category = await this.categoryRepository.findById(category_id);

        if (!category) {
            throw new AppError('Could not find any category with the given id.');
        }

        const user = await this.userRepository.findById(user_id);

        if(!user) {
            throw new AppError('Could not find any user with the given id.');
        }

        data.name = name;
        data.description = description;
        data.content = content;
        data.image_url = image_url;
        data.category = category;
        data.user = user;
        data.updated_at = new Date();
        await this.repository.save(data);
        return data;
    }

    async index(): Promise<IPaginate<IArticle[]>> {
        const data = await this.repository.index();
        data.data.map( (obj: IArticle) => {
            obj.content = obj.content.toString();
        });
        return data as IPaginate<IArticle[]>;
    }

    async show(id: string): Promise<IArticle> {
        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('Article not found.');
        }

        data.content = data.content.toString();

        return data;
    }

    async delete(id: string): Promise<void> {

        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('Article not found.');
        }

        data.deleted_at = new Date();

        await this.repository.save(data);
    }
}