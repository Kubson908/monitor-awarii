import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Pracownik, Stanowisko } from "./";
@Entity()
export class Awaria {
    @PrimaryGeneratedColumn({
        type: "int",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    opis_awarii: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    status: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    priorytet: string;

    @CreateDateColumn()
    data_zgloszenia: string;

    @Column({
        type: "datetime",
        nullable: true
    })
    data_podjecia: string;

    @Column({
        type: "datetime",
        nullable: true
    })
    data_naprawy: string;

    @ManyToOne(type => Pracownik)
    @JoinColumn({name: "id_pracownika"})
    pracownik: Pracownik

    @OneToOne(type => Stanowisko)
    @JoinColumn({name: "id_stanowiska"})
    stanowisko: Stanowisko

}
