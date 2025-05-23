import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './user.entity';
import { CreateUserDto } from '../auth/Dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Usuario)
        private usersRepository: Repository<Usuario>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Usuario> {
        const user = this.usersRepository.create({
            correo: createUserDto.email,
            contrasena: createUserDto.password,
        });
        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        return this.usersRepository.findOne({ where: { correo: email } });
    }
}
