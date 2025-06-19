import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './user.entity';
import { CreateUserDto } from '../auth/Dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    const salt = await bcrypt.genSalt(); // genera una cadena unica y se coloca en el hash para que cada hash sea unico
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      correo: createUserDto.email,
      contrasena: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usersRepository.findOne({ where: { correo: email } });
  }
}
