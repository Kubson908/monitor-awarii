import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { dataSource } from 'src/core/database/database.provider';
import { Awaria, Pracownik, Stanowisko } from 'src/core/database/entities';
import { CreateAwariaDto } from '../dtos/create-awaria.dto';

@Injectable()
export class AwariaService {
  async awariaList() {
    const awarie = await dataSource
      .createQueryBuilder()
      .select('awaria')
      .from(Awaria, 'awaria')
      .getMany();
    return awarie;
  }

  async awariaById(id) {
    const awaria = await dataSource
      .createQueryBuilder()
      .select('awaria')
      .from(Awaria, 'awaria')
      .where('awaria.id = :_id', { _id: id })
      .getOne();
    if (awaria) return awaria;
    throw new HttpException(
      'Nie znaleziono awarii o podanym ID',
      HttpStatus.NOT_FOUND,
    );
  }

  async createAwaria(createAwariaDto: CreateAwariaDto) {
    const newAwaria = new Awaria();

    const pracownik = await dataSource
      .getRepository(Pracownik)
      .findOne({ where: { id: createAwariaDto.pracownik } });

    const stanowisko = await dataSource
      .getRepository(Stanowisko)
      .findOne({ where: { id: createAwariaDto.stanowisko } });

    if (!stanowisko)
      throw new HttpException(
        'Nie znaleziono stanowiska o podanym ID',
        HttpStatus.NOT_FOUND,
      );

    if (!pracownik)
      throw new HttpException(
        'Nie znaleziono pracownika o podanym ID',
        HttpStatus.NOT_FOUND,
      );

    newAwaria.opis_awarii = createAwariaDto.opis_awarii;
    newAwaria.priorytet = createAwariaDto.priorytet;
    newAwaria.stanowisko = stanowisko;
    newAwaria.status = createAwariaDto.status;
    newAwaria.pracownik = pracownik;
    newAwaria.data_podjecia = await new Date().toJSON().split('.')[0];

    const awariaRepository = await dataSource.getRepository(Awaria);
    await awariaRepository.save(newAwaria);

    return 'Success';
  }
}
