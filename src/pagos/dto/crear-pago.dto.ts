import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CrearPagoDto {
  @IsNumber()
  id_servicio: number;

  @IsNumber()
  monto: number;

  @IsString()
  estado_pago: string;

  @IsDateString()
  fecha_pago: string;
}
