import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @Expose()
  readonly nombre_usuario?: string;

  @IsEmail({}, { message: 'Se debe ingresar un correo válido.\n' })
  @Expose()
  readonly correo: string;

  @IsOptional()
  @IsString()
  @MinLength(4, {
    message: 'La contraseña debe tener al menos 4 caracteres.\n',
  })
  @Expose()
  readonly password?: string;

  @IsOptional()
  @IsString()
  @MinLength(4, {
    message:
      'La confirmación de la contraseña debe tener al menos 4 caracteres.\n',
  })
  @Expose()
  readonly confirmedPassword?: string;
}
