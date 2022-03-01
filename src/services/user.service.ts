import {IUser} from '../interfaces/user.interface';
import AppError from '@shared/errors/app.error';
import {compare, hash} from 'bcryptjs';
import {getCustomRepository} from 'typeorm';
import {User} from '../entities/user';
import {IPaginate} from '../interfaces/paginate.interface';
import {IUserToken} from '../interfaces/user-token.interface';
import {Secret, sign} from 'jsonwebtoken';
import authConfig from '@config/auth';
import UserTokenRepository from '../repositories/user-token.repository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import EtherealMail from '@core/mail/ethereal.mail';
import {addHours, isAfter} from 'date-fns';
import {IRepository} from '../interfaces/repository.interface';
import {inject, injectable} from 'tsyringe';

@injectable()
export class UserService {

    constructor(
        @inject('UserRepository')
        private repository: IRepository) {}

    async create( name: string, email: string, password: string): Promise<IUser> {

        const emailExists = await this.repository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await hash(password, 8);

        return await this.repository.create({
            name,
            email,
            password: hashedPassword,
            admin: false
        });
    }

    async index (): Promise<IPaginate<User>> {
        const data = await this.repository.index();
        return data as IPaginate<User>;
    }

    async update(
        id: string,
        name: string,
        email: string,
        admin: boolean,
        password: string,
        old_password: string
    ): Promise<IUser> {
        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('User not found.');
        }

        const hasEmail = await this.repository.findByEmail(email);

        if (hasEmail && hasEmail.id !== id) {
            throw new AppError('There is already one user with this email.');
        }

        if (password && !old_password) {
            throw new AppError('Old password is required.');
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, data.password);

            if(!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }

            data.password = await hash(password, 8);
        }

        data.name = name;
        data.email = email;
        data.admin = admin;
        data.updated_at = new Date();

        await this.repository.save(data);
        return data;
    }

    async delete(id: string): Promise<void> {
        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('User not found.');
        }

        data.deleted_at = new Date();

        await this.repository.save(data);
    }

    async show(id: string): Promise<IUser> {
        const data = await this.repository.findById(id);

        if(!data) {
            throw new AppError('User not found.');
        }
        return data;
    }

    async login(email: string, password: string): Promise<IUserToken> {
        const data = await this.repository.findByEmail(email);
        if (!data) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await compare(password, data.password);

        if(!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret as Secret, {
            subject: data.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {user: data, token };
    }

    async avatar(user_id: string, avatar_filename: string): Promise<User> {
        const data = await this.repository.findById(user_id);

        if(!data) {
            throw new AppError('User not found.');
        }

        if(data.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, data.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        data.avatar = avatar_filename;

        await this.repository.save(data);

        return data;
    }

    async sendForgotPassword(email: string): Promise<string> {
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const data = await this.repository.findByEmail(email);

        if (!data) {
            throw new AppError('User does not exists.');
        }

        const { token }  = await userTokenRepository.generate(data);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'core',
            'mail',
            'forgot_password.hbs'
        );

        const sendEmail = await EtherealMail.sendEmail({
            to: {
                name: data.name,
                email: data.email,
            },
            subject: '[WIKI] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: data.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                }
            }
        });
        if(!sendEmail) {
            throw new AppError('could not send password recovery email, please try again later.');
        }
        return sendEmail;
    }

    async resetPassword( password: string, token: string,): Promise<void> {
            const userTokenRepository = getCustomRepository(UserTokenRepository);

            const userToken = await userTokenRepository.findByToken(token);

            if (!userToken) {
                throw new AppError('User Token does not exists.');
            }

            const data = await this.repository.findById(userToken.user.id as string);

            if (!data) {
                throw new AppError('User does not exists.');
            }
            const tokenCreatedAt = userToken.created_at;
            const compareDate = addHours(tokenCreatedAt, 2);

            if(isAfter(Date.now(), compareDate)) {
                throw new AppError('Token expired.');
            }

            data.password = await hash(password, 8);

            await this.repository.save(data);
    }
}