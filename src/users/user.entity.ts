import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Alarmas } from '../alarmas/alarm.entity';
import { Pago } from '../pagos/entities/pagos.entity';

@Entity('Usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: true })
  nombre: string;

  @Column({ name: 'correo', unique: true })
  correo: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 255, nullable: true })
  contrasena: string | null; 

  @OneToMany(() => Alarmas, (alarma) => alarma.usuario)
  alarmas: Alarmas[];

  @OneToMany(() => Pago, (pago) => pago.usuario)
  pagos: Pago[];
}
