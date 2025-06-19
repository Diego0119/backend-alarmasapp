import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarmas } from './alarm.entity';
import { AlarmasService } from './alarmas.service';
import { AlarmasController } from './alarmas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alarmas])],
  providers: [AlarmasService],
  controllers: [AlarmasController],
  exports: [AlarmasService],
})
export class AlarmasModule {}
