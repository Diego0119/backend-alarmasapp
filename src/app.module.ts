import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AlarmasModule } from './alarmas/alarmas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'alarmasapp',
      autoLoadEntities: true,
      synchronize: false, // si esta en true typeorm intenta crear las tablas automaticamente
    }),
    UsersModule,
    AuthModule,
    AlarmasModule,
  ],
})
export class AppModule { }
