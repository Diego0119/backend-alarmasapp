import {
    IsInt,
    IsDateString,
    IsString,
    IsBoolean,
    IsOptional,
} from 'class-validator';

export class CreateAlarmDto {
    @IsInt()
    readonly id_usuario: number;

    @IsInt()
    readonly id_servicio: number;

    @IsDateString()
    readonly fecha_alarma: string;

    @IsString()
    readonly hora: string;

    @IsString()
    readonly mensaje: string;

    @IsBoolean()
    readonly estado_alarma: boolean;
}
