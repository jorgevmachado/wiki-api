import {Article} from '../entities/article';
import ArticleRepository from '../repositories/article.repository';
import {getCustomRepository} from 'typeorm';
import CategoryRepository from '../repositories/category.repository';
import AppError from '@shared/errors/app.error';
import UserRepository from '../repositories/user.repository';
import {IPaginate} from '../interfaces/paginate.interface';
import {IArticle} from '../interfaces/article.interface';

export class ArticleService {
    async create(
        name: string,
        description: string,
        content: string,
        image_url: string,
        category_id: string,
        user_id: string,
    ): Promise<Article> {
        const repository = getCustomRepository(ArticleRepository);
        const categoryRepository = getCustomRepository(CategoryRepository);
        const userRepository = getCustomRepository(UserRepository);

        const category = await categoryRepository.findById(category_id);

        if (!category) {
            throw new AppError('Could not find any category with the given id.');
        }

        const user = await userRepository.findById(user_id);

        if(!user) {
            throw new AppError('Could not find any user with the given id.');
        }

        const nameExists = await repository.findByName(name);

        if(nameExists) {
            throw new AppError('Article name already used.');
        }

        const data = await repository.create({
            name,
            description,
            content,
            image_url,
            category,
            user,
        });
        await repository.save(data);
        return data;
    }

    async update(
        id: string,
        name: string,
        description: string,
        content: string,
        image_url: string,
        category_id: string,
        user_id: string,
    ): Promise<Article> {
        const repository = getCustomRepository(ArticleRepository);
        const categoryRepository = getCustomRepository(CategoryRepository);
        const userRepository = getCustomRepository(UserRepository);

        const data = await repository.findById(id);

        if(!data) {
            throw new AppError('Article not found.');
        }

        const nameExists = await repository.findByName(name);

        if(nameExists && nameExists.id !== id) {
            throw new AppError('Article name already used.');
        }

        const category = await categoryRepository.findById(category_id);

        if (!category) {
            throw new AppError('Could not find any category with the given id.');
        }

        const user = await userRepository.findById(user_id);

        if(!user) {
            throw new AppError('Could not find any user with the given id.');
        }

        data.name = name;
        data.description = description;
        data.content = content;
        data.image_url = image_url;
        data.category = category;
        data.user = user;
        await repository.save(data);
        return data;
    }

    async index(): Promise<IPaginate<IArticle>> {
        const repository = getCustomRepository(ArticleRepository);
        const data = await repository.createQueryBuilder().paginate();
        data.data.map( (obj: IArticle) => {
            obj.content = obj.content.toString();
        });
        return data as IPaginate<Article>;
    }

    async show(id: string): Promise<IArticle> {
        const repository = getCustomRepository(ArticleRepository);

        const data = await repository.findById(id);

        if(!data) {
            throw new AppError('Article not found.');
        }

        data.content = data.content.toString();

        return data;
    }

    async delete(id: string): Promise<void> {
        const repository = getCustomRepository(ArticleRepository);

        const data = await repository.findById(id);

        if(!data) {
            throw new AppError('Article not found.');
        }

        data.deleted_at = new Date();

        await repository.save(data);
    }
}