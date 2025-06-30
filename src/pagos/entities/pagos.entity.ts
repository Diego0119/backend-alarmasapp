import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../users/user.entity';
import { Servicio } from '../../servicios/servicios.entity';
import { OneToMany } from 'typeorm';

@Entity('Pagos')
export class Pagos {
  @PrimaryGeneratedColumn({ name: 'id_pago' })
  id_pago: number;

  @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ name: 'fecha_pago', type: 'date' })
  fecha_pago: string;

  @Column({ name: 'estado_pago', type: 'varchar', length: 20 })
  estado_pago: string;

  @ManyToOne(() => Usuario, usuario => usuario.pagos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Servicio, servicio => servicio.pagos)
  @JoinColumn({ name: 'id_servicio' })
  servicio: Servicio;

  @OneToMany(() => Pagos, pago => pago.usuario)
  pagos: Pagos[];
}
