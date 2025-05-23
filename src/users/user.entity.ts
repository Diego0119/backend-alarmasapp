import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
