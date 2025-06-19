import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateAlarmDto {
  @IsNumber()
  id_alarma: number;

  @IsBoolean()
  estado_alarma: boolean;
}
