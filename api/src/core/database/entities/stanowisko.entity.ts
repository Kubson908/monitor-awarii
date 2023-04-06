import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Stanowisko {
    @PrimaryGeneratedColumn({
        type: "int",
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    kod: string;

    @Column({
        type: "varchar",
        length: 1000,
        nullable: false,
    })
    nazwa: string;

    @Column({
        type: "varchar",
        length: 1000,
        nullable: false,
    })
    opis: string;

}