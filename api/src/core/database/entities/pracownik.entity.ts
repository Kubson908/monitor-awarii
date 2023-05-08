import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Pracownik {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  imie: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  nazwisko: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  login: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  haslo: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  rola: string;
}
