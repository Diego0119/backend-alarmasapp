import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Alarmas } from '../alarmas/alarm.entity';
import { Pagos } from '../pagos/entities/pagos.entity';

@Entity('Servicios')
export class Servicio {
  @PrimaryGeneratedColumn({ name: 'id_servicio' })
  id_servicio: number;

  @Column({ name: 'nombre_servicio' })
  nombre_servicio: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Alarmas, alarma => alarma.servicio)
  alarmas: Alarmas[];

  @OneToMany(() => Pagos, pago => pago.servicio)
  pagos: Pagos[];
}
