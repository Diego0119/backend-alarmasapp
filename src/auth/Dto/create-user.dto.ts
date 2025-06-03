import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: ' Se debe ingresar un correo valido.\n' })
    readonly email: string;

    @IsString()
    @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres.\n' })
    readonly password: string;

    @IsString()
    @MinLength(4, { message: 'La confirmación de la contraseña debe tener al menos 4 caracteres.\n' })
    readonly confirmedPassword: string;
}