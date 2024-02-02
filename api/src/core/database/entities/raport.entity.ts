import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne } from "typeorm"
import { Awaria } from "./awaria.entity";
@Entity()
export class Raport {
    @PrimaryGeneratedColumn({
        type: "int",
    })
    id: number;

    @CreateDateColumn({
        type: "datetime",
        nullable: false,
    })
    czas: string;

    @Column({
        type: "varchar",
        length: 999,
        nullable: true,
    })
    opis: string;

    @OneToOne(type => Awaria)
    @JoinColumn({name: "id_awarii"})
    awaria: Awaria
}