import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from './Dto/create-alarm.dto';
import { UpdateAlarmDto } from './Dto/change-state.dto';

@Injectable()
export class AlarmasService {
    async addAlarm(createAlarmDto: CreateAlarmDto): Promise<any> {
        const { name, dayOfWeek, alarmTime, isOn } = createAlarmDto;

        // insertar alarma en la base de datos

        return {
            message: 'Datos de la nueva alarma a crear',
            name: { name },
            dayOfWeek: { dayOfWeek },
            alarmTime: { alarmTime },
            isOn: { isOn },
        };
    }
}
