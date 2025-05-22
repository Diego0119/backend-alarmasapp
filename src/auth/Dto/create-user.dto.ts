import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(4)
    readonly password: string;

    @IsString()
    @MinLength(4)
    readonly confirmedPassword: string;
}
