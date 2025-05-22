import { Module } from '@nestjs/common';
import { AlarmasController } from './alarmas.controller';
import { AlarmasService } from './alarmas.service';

@Module({
  controllers: [AlarmasController],
  providers: [AlarmasService]
})
export class AlarmasModule {}
