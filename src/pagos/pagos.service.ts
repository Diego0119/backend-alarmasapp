import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pagos.entity'; 
import { Alarmas } from '../alarmas/alarm.entity';
import { CrearPagoDto } from './dto/crear-pago.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago) 
    private readonly pagoRepository: Repository<Pago>,

    @InjectRepository(Alarmas)
    private readonly alarmaRepository: Repository<Alarmas>,
  ) {}

  async obtenerPagosYAlarmas(userId: number, mes?: number, anio?: number) {
    const pagos = await this.pagoRepository.find({
      where: { usuario: { id_usuario: userId } },
      relations: ['servicio'],
    });

    const alarmas = await this.alarmaRepository.find({
      where: { usuario: { id_usuario: userId }, estado_alarma: true },
      relations: ['servicio'],
    });

    const ahora = new Date();

    const pagosFiltrados = pagos.filter(p => {
      if (!mes || !anio) return true;
      const fecha = new Date(p.fecha_pago);
      return (
        fecha.getMonth() + 1 === mes &&
        fecha.getFullYear() === anio
      );
    });

    const serviciosPagadosDelMes = new Set(
      pagosFiltrados.map(p => p.servicio.id_servicio)
    );

    const pagosConvertidos = pagosFiltrados.map(p => ({
      nombre_servicio: p.servicio.nombre_servicio,
      fecha: p.fecha_pago,
      monto: p.monto,
      estado: p.estado_pago,
      id_servicio: p.servicio.id_servicio,
    }));

    const alarmasNoPagadas = alarmas
      .filter(a => {
        const fecha = new Date(`${a.fecha_alarma}T${a.hora}`);
        const mesOk = !mes || fecha.getMonth() + 1 === mes;
        const anioOk = !anio || fecha.getFullYear() === anio;
        const noPagado = !serviciosPagadosDelMes.has(a.servicio.id_servicio);
        return mesOk && anioOk && noPagado;
      })
      .map(a => {
        const fecha = new Date(`${a.fecha_alarma}T${a.hora}`);
        return {
          nombre_servicio: a.servicio.nombre_servicio,
          fecha: a.fecha_alarma,
          monto: null,
          estado: fecha < ahora ? 'Atrasado' : 'Pendiente',
          id_servicio: a.servicio.id_servicio,
        };
      });

    return [...pagosConvertidos, ...alarmasNoPagadas];
  }

  async registrarPago(userId: number, dto: CrearPagoDto) {
    const nuevoPago = this.pagoRepository.create({
      usuario: { id_usuario: userId },
      servicio: { id_servicio: dto.id_servicio },
      monto: dto.monto,
      fecha_pago: dto.fecha_pago,
      estado_pago: dto.estado_pago,
    });

    return this.pagoRepository.save(nuevoPago);
  }

  async eliminarPago(userId: number, idServicio: number) {
    const pago = await this.pagoRepository.findOne({
      where: {
        usuario: { id_usuario: userId },
        servicio: { id_servicio: idServicio },
      },
    });

    if (!pago) {
      throw new Error('Pago no encontrado para este usuario y servicio.');
    }

    return this.pagoRepository.remove(pago);
  }
}
