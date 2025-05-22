import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { LoginUserDto } from './Dto/login-user.dto';

@Injectable()
export class AuthService {
    async register(createUserDto: CreateUserDto): Promise<any> {
        const { email, password, confirmedPassword } = createUserDto;

        if (password !== confirmedPassword) {
            throw new BadRequestException('Las contraseñas no coinciden');
        }

        // insertar al user en la base de datos

        return {
            message: 'Usuario registrado exitosamente',
            user: { email },
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
