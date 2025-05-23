import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService], // declara el servicio UsersService como inyectable. Esto permite usarlo en cualquier parte del módulo, por ejemplo, en el controlador.
  controllers: [AuthController] // le indica que se usara AuthController como manejador http
})
export class AuthModule { }
