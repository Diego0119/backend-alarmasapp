import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';
import { Expose } from 'class-transformer'; // 👈 importá esto

export class CreateUserDto {
  @IsEmail({}, { message: 'Se debe ingresar un correo válido.\n' })
  @Expose()
  readonly email: string;

  @IsString()
  @MinLength(4, {
    message: 'La contraseña debe tener al menos 4 caracteres.\n',
  })
  @Expose()
  readonly password: string;

  @IsString()
  @MinLength(4, {
    message:
      'La confirmación de la contraseña debe tener al menos 4 caracteres.\n',
  })
  @Expose()
  readonly confirmedPassword: string;
}
