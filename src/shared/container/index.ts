import { container } from 'tsyringe';
import {IRepository} from '../../interfaces/repository.interface';
import UserRepository from '../../repositories/user.repository';

container.registerSingleton<IRepository>('UserRepository', UserRepository );