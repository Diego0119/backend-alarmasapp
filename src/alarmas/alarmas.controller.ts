import { Body, Controller, Post, Get, Put, Query } from '@nestjs/common';
import { CreateAlarmDto } from './Dto/create-alarm.dto';
import { UpdateAlarmDto } from './Dto/change-state.dto';
import { AlarmasService } from './alarmas.service';
import { BadRequestException } from '@nestjs/common';

@Controller('alarmas')
export class AlarmasController {
    constructor(private readonly alarmService: AlarmasService) { }

    @Post('add-alarm')
    async register(@Body() createAlarmDto: CreateAlarmDto) {
        console.log('Body recibido:', createAlarmDto);
        return this.alarmService.addAlarm(createAlarmDto);
    }

    @Get('get-alarms')
    async getAlarms(@Query('idUsuario') idUsuario: string) {
        console.log("Entro a get alarms con idUsuario:", idUsuario);

        const id = parseInt(idUsuario, 10);

        if (isNaN(id)) {
            throw new BadRequestException('El idUsuario proporcionado no es válido.');
        }

        return this.alarmService.getAlarmsByUser(id);
    }

    @Put('change-status')
    async changeState(@Body() updateAlarmDto: UpdateAlarmDto) {
        console.log('Body en change status:', updateAlarmDto);
        return this.alarmService.changeStatus(updateAlarmDto);
    }

}
