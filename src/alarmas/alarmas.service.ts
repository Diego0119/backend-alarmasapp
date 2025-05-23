import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlarmDto } from './Dto/create-alarm.dto';
import { Alarmas } from './alarm.entity';

@Injectable()
export class AlarmasService {
    constructor(
        @InjectRepository(Alarmas)
        private alarmRepository: Repository<Alarmas>,
    ) { }

    async addAlarm(createAlarmDto: CreateAlarmDto): Promise<any> {
        const alarma = this.alarmRepository.create({
            id_usuario: createAlarmDto.id_usuario,
            id_servicio: createAlarmDto.id_servicio,
            fecha_alarma: new Date(createAlarmDto.fecha_alarma),
            hora: createAlarmDto.hora,
            mensaje: createAlarmDto.mensaje,
            estado_alarma: createAlarmDto.estado_alarma,
        });

        return this.alarmRepository.save(alarma);
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
