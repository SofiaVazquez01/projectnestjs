import {Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';


@Entity({schema: 'propietarios', name: 'propietarios'})
export class Propietarios{

    @PrimaryGeneratedColumn()
    propietarios_id: number
    @Column(/* {unique: true} */)
    base_datos: string
    @Column()
    nombre: string
    @Column()
    telefono: number
    @Column()
    imagen_corporativa: string
    @Column()
    correo_propietario: string
    @Column()
    estatus: string;

}

