import { Injectable, BadRequestException } from '@nestjs/common';
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
    if (!createUserDto.password) {
      throw new BadRequestException('La contraseña es requerida');
    }

    const salt = await bcrypt.genSalt();

    if (!createUserDto.password) {
      throw new BadRequestException('La contraseña es requerida');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      correo: createUserDto.correo,
      contrasena: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    return this.usersRepository.findOne({ where: { correo } });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.findByCorreo(email);
  }

  async createWithGoogle(nombre: string, correo: string): Promise<Usuario> {
    const user = this.usersRepository.create({
      nombre,
      correo,
      contrasena: null,
    });

    return this.usersRepository.save(user);
  }
}
