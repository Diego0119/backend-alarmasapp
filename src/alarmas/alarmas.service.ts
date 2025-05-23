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

    async getAlarms() {

        const name1 = 'Alarma 1';
        const dayOfWeek1 = 'Lunes';
        const alarmTime1 = '14:30';
        const isOn1 = false;

        const name2 = 'Alarma 1';
        const dayOfWeek2 = 'Lunes';
        const alarmTime2 = '14:30';
        const isOn2 = true;

        const name3 = 'Alarma 1';
        const dayOfWeek3 = 'Lunes';
        const alarmTime3 = '14:30';
        const isOn3 = false;
        return {
            message: 'Datos de las alarmas',
            alarm1: {
                name: name1,
                dayOfWeek: dayOfWeek1,
                alarTime: alarmTime1,
                isOn: isOn1,
            },

            alarm2: {
                name: name2,
                dayOfWeek: dayOfWeek2,
                alarTime: alarmTime2,
                isOn: isOn2,
            },

            alarm3: {
                name: name3,
                dayOfWeek: dayOfWeek3,
                alarTime: alarmTime3,
                isOn: isOn3,
            },
        };
    }
}
