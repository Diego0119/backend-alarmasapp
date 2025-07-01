import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { LoginUserDto } from './Dto/login-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../users/user.entity';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private oauthClient = new OAuth2Client(
    '668206295889-gsvoro9itd1keousu7rbn49cd721dnu5.apps.googleusercontent.com',
  );

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { correo, password, confirmedPassword } = createUserDto;

    if (!password || !confirmedPassword) {
      throw new BadRequestException(
        'La contraseña y su confirmación son obligatorias',
      );
    }

    if (password !== confirmedPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const usuarioExistente = await this.usersService.findByCorreo(correo);
    if (usuarioExistente) {
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

    const user = await this.usersService.findByCorreo(email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.contrasena || '',
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const token = this.generarToken(user);

    return {
      message: 'Login correcto',
      token,
      user: {
        id: user.id_usuario,
        correo: user.correo,
      },
    };
  }

  async loginWithGoogle(idToken: string) {
    if (!idToken) {
      throw new BadRequestException('No se recibió idToken desde el frontend');
    }

    const ticket = await this.oauthClient.verifyIdToken({
      idToken,
      audience:
        '668206295889-gsvoro9itd1keousu7rbn49cd721dnu5.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Token de Google inválido');
    }

    const { email, name } = payload;

    if (!email) {
      throw new UnauthorizedException(
        'El token de Google no contiene correo',
      );
    }

    let user = await this.usersService.findByCorreo(email);
    if (!user) {
      user = await this.usersService.create({
        nombre_usuario: name,
        correo: email,
      });
    }

    const token = await this.jwtService.signAsync({ sub: user.id_usuario });

    return {
      message: 'Login con Google exitoso',
      token,
      id_usuario: user.id_usuario,
    };
  }

  generarToken(user: Usuario): string {
    const payload = { sub: user.id_usuario, email: user.correo };
    return this.jwtService.sign(payload);
  }
}
