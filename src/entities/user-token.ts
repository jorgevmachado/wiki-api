import {IUser} from '../interfaces/user.interface';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Generated,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {IUserToken} from '../interfaces/user-token.interface';
import {User} from './user';

@Entity('user_tokens')
export class UserToken implements IUserToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: IUser;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}