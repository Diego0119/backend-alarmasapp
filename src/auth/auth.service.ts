import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { LoginUserDto } from './Dto/login-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async register(createUserDto: CreateUserDto): Promise<any> {
        const { email, password, confirmedPassword } = createUserDto;

        if (password !== confirmedPassword) {
            throw new BadRequestException('Las contraseñas no coinciden');
        }

        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException('El correo ya está registrado');
        }

        const user = await this.usersService.create(createUserDto);

        return {
            message: 'Usuario registrado exitosamente',
            user: { correo: user.correo },
        };
    }

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;

        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        const passwordMatches = await bcrypt.compare(password, user.contrasena);
        if (!passwordMatches) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        return {
            message: 'Login correcto',
            user: {
                id: user.id_usuario,
                correo: user.correo,
            },
        }
    }
}
