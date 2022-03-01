import {ICategory} from '../interfaces/category.interface';
import CategoryRepository from '../repositories/category.repository';
import {IPaginate} from '../interfaces/paginate.interface';
import {Category} from '../entities/category';
import AppError from '@shared/errors/app.error';
import {ICategoryTree} from '../interfaces/category-tree.interface';
import ArticleRepository from '../repositories/article.repository';
import {inject, injectable} from 'tsyringe';
import {IRepository} from '../interfaces/repository.interface';
import {IArticle} from '../interfaces/article.interface';

@injectable()
export class CategoryService {

    constructor(
        @inject('CategoryRepository')
        private repository: IRepository<ICategory>,
        @inject('ArticleRepository')
        private articleRepository: IRepository<IArticle>
    ) {

    }

    async create(name: string, parent_id?: string): Promise<ICategory> {
        parent_id = parent_id ? parent_id : '';
        return await this.repository.create({name, parent_id });
    }

    async index(): Promise<IPaginate<ICategory[]>> {
        const data = await this.repository.index();
        data.data = this.path(data.data);
        return data as IPaginate<Category[]>;
    }

    async update(id: string, name: string, parent_id: string): Promise<ICategory> {
        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('Category not found.');
        }

        data.name = name;
        data.updated_at = new Date();

        if(parent_id) {
            data.parent_id = parent_id;
        }

        await this.repository.save(data);
        return data;
    }

    async show(id: string): Promise<ICategory> {
        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('Category not found.');
        }
        return data;
    }

    async delete(id: string): Promise<void> {
        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('Category not found.');
        }

        const subCategoryExists = await this.repository.findByParentId(id);

        if(subCategoryExists) {
            throw new AppError('Category has subcategories.');
        }

        const articlesExists = await this.articleRepository.findByCategory(data);

        if(articlesExists) {
            throw new AppError('Category has articles.');
        }

        data.deleted_at = new Date();

        await this.repository.save(data);
    }

    async tree(): Promise<ICategoryTree[] | undefined> {
        const data = await this.repository.find();
        return this.toTree(data);
    }

    private path(data: ICategory[]) {
        const dataWithPath = this.getDataWithPath(data);
        dataWithPath.sort((a, b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        });
        return dataWithPath;
    }

    private getParent(categories: ICategory[], parentID: string) {
        const parent = categories.filter(parent => parent.id === parentID);
        return parent.length ? parent[0] : null;
    }

    private getDataWithPath(categories: ICategory[]) {
        return  categories.map(obj => {
            let path = obj.name;
            let parent = this.getParent(categories, obj.parent_id);
            while(parent) {
                path = `${parent.name} > ${path}`;
                parent = this.getParent(categories, parent.parent_id);
            }
            return {...obj, path};
        });
    }

    private toTree(categories: ICategory[], tree?: ICategoryTree[]): ICategoryTree[] | undefined {
        if(!tree) tree = this.transformCategoryTree(categories.filter(c => !c.parent_id));
        tree = tree.map(parentNode => {
            parentNode.children = this.toTree(categories, this.transformCategoryTree(categories.filter(f => f.parent_id === parentNode.id)));
            return parentNode;
        });
        return tree;
    }

    private transformCategoryTree(categories: ICategory[]) {
        const categoriesTree: ICategoryTree[] = [];
        categories.map(c => {
           categoriesTree.push({
               id: c.id,
               name: c.name,
               parent_id: c.parent_id,
               children: []
           })
        });
        return categoriesTree;
    }

}