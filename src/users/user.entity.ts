import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Alarmas } from 'src/alarmas/alarm.entity';
import { Pagos } from 'src/pagos/entities/pagos.entity';
import { OneToMany } from 'typeorm';

@Entity('Usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'correo', unique: true })
  correo: string;

  @Column({ name: 'contrasena' })
  contrasena: string;

  @OneToMany(() => Alarmas, alarma => alarma.usuario)
  alarmas: Alarmas[];

  @OneToMany(() => Pagos, pago => pago.usuario)
  pagos: Pagos[];
}
