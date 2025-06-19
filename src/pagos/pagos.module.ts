import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { Pagos } from './entities/pagos.entity';
import { Alarmas } from '../alarmas/alarm.entity';
import { Servicio } from '../servicios/servicios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pagos, Alarmas, Servicio])],
  providers: [PagosService],
  controllers: [PagosController],
})
export class PagosModule {}
