import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Alarmas } from './alarmas/alarm.entity';

@Entity('Servicios')
export class Servicio {
  @PrimaryGeneratedColumn({ name: 'id_servicio' })
  id_servicio: number;

  @Column({
    name: 'nombre_servicio',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  nombre_servicio: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Alarmas, (alarma) => alarma.servicio)
  alarmas: Alarmas[];
}
