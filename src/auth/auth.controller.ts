import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './Dto/create-user.dto';
import { LoginUserDto } from './Dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        console.log('Body recibido:', createUserDto);
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        console.log("Body recibido: ", loginUserDto);
        return this.authService.login(loginUserDto);
    }
}
