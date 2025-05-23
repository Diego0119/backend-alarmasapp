import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { LoginUserDto } from './Dto/login-user.dto';
import { UsersService } from '../users/users.service';

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

        const user_password = '1111';

        if (user_password != password) {

            throw new UnauthorizedException('Las contraseñas no coinciden');
        }

        return {
            message: 'Login correcto'
        }

    }
}
