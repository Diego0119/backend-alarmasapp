import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AuthService {
    async register(createUserDto: CreateUserDto): Promise<any> {
        const { email, password } = createUserDto;
        return {
            message: 'Usuario registrado exitosamente',
            user: { email },
        };
    }
}
