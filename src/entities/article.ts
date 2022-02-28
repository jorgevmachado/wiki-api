import {IArticle} from '../interfaces/article.interface';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Category} from './category';
import {User} from './user';

@Entity('articles')
export class Article implements IArticle {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    content: string;

    @Column()
    image_url: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id'})
    category: Category;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}