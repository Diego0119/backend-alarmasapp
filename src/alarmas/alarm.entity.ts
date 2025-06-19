import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Servicio } from 'src/servicios/servicios.entity';
import { Usuario } from 'src/users/user.entity';

@Entity('Alarmas')
export class Alarmas {
  @PrimaryGeneratedColumn({ name: 'id_alarma' })
  id_alarma: number;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'id_servicio' })
  id_servicio: number;

  @Column({ name: 'fecha_alarma', type: 'date' })
  fecha_alarma: Date;

  @Column({ name: 'hora', type: 'time' })
  hora: string;

  @Column({ name: 'mensaje', type: 'varchar', length: 255 })
  mensaje: string;

  @Column({ name: 'estado_alarma', type: 'boolean' })
  estado_alarma: boolean;

  @ManyToOne(() => Servicio, (servicio) => servicio.alarmas)
  @JoinColumn({ name: 'id_servicio' })
  servicio: Servicio;

  @ManyToOne(() => Usuario, usuario => usuario.alarmas)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
