import { Body, Controller, Post, Get, Put } from '@nestjs/common';
import { CreateAlarmDto } from './Dto/create-alarm.dto';
import { UpdateAlarmDto } from './Dto/change-state.dto';
import { AlarmasService } from './alarmas.service';

@Controller('alarmas')
export class AlarmasController {
    constructor(private readonly alarmService: AlarmasService) { }

    @Post('add-alarm')
    async register(@Body() createAlarmDto: CreateAlarmDto) {
        console.log('Body recibido:', createAlarmDto);
        return this.alarmService.addAlarm(createAlarmDto);
    }

    @Get('get-alarms')
    async getAlarms() {
        console.log("Entro a get alarms");
        return this.alarmService.getAlarms();
    }

    @Put('change-status')
    async changeState(@Body() updateAlarmDto: UpdateAlarmDto) {
        console.log('Body en change status:', updateAlarmDto);
        return this.alarmService.changeStatus(updateAlarmDto);
    }

}
