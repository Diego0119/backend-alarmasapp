import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlarmDto } from './Dto/create-alarm.dto';
import { UpdateAlarmDto } from './Dto/change-state.dto';
import { Alarmas } from './alarm.entity';

@Injectable()
export class AlarmasService {
  constructor(
    @InjectRepository(Alarmas)
    private alarmRepository: Repository<Alarmas>,
  ) {}

  async addAlarm(createAlarmDto: CreateAlarmDto): Promise<any> {
    const alarma = this.alarmRepository.create({
      usuario: { id_usuario: createAlarmDto.id_usuario },
      servicio: { id_servicio: createAlarmDto.id_servicio },
      fecha_alarma: createAlarmDto.fecha_alarma,
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

  async getAlarmsByUser(idUsuario: number): Promise<Alarmas[]> {
    return this.alarmRepository.find({
      where: { usuario: { id_usuario: idUsuario } },
      relations: ['servicio'],
    });
  }

  async changeStatus(updateAlarmDto: UpdateAlarmDto): Promise<any> {
    const { id_alarma, estado_alarma } = updateAlarmDto;

    const alarma = await this.alarmRepository.findOne({ where: { id_alarma } });

    if (!alarma) {
      throw new NotFoundException('Alarma no encontrada');
    }

    alarma.estado_alarma = estado_alarma;

    return this.alarmRepository.save(alarma);
  }

  async deleteAlarma(idAlarma: number, idUsuario: number): Promise<void> {
    const alarma = await this.alarmRepository.findOne({
      where: { id_alarma: idAlarma },
      relations: ['usuario'],
    });

    if (!alarma) {
      throw new NotFoundException('Alarma no encontrada');
    }

    if (alarma.usuario.id_usuario !== idUsuario) {
      throw new ForbiddenException('No tienes permiso para eliminar esta alarma');
    }

    await this.alarmRepository.remove(alarma);
  }
}
