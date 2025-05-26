import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlarmDto } from './Dto/create-alarm.dto';
import { Alarmas } from './alarm.entity';
import { UpdateAlarmDto } from './Dto/change-state.dto';

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

    async getAlarms(): Promise<Alarmas[]> {
        return this.alarmRepository.find({
            relations: ['servicio'],
        });
    }

    async changeStatus(updateAlarmDto: UpdateAlarmDto): Promise<any> {
        const { id_alarma, estado_alarma } = updateAlarmDto;

        const alarma = await this.alarmRepository.findOne({ where: { id_alarma } });

        if (!alarma) {
            throw new Error('Alarma no encontrada');
        }

        alarma.estado_alarma = estado_alarma;

        return this.alarmRepository.save(alarma);
    }

}