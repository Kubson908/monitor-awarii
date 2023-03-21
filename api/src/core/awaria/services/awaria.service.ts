import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Awaria, Stanowisko } from 'src/core/database/entities';
import { CreateAwariaDto } from '../dtos/create-awaria.dto';
import { Gateway } from '../../../gateway/gateway';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AwariaService {
  constructor(private gateway: Gateway, @InjectRepository(Awaria) private awariaRepository: Repository<Awaria>, 
    @InjectRepository(Stanowisko) private stanowiskoRepository: Repository<Stanowisko>) {}
  async awariaList() {
    const awarie = await this.awariaRepository.find();
    return awarie;
  }

  async awariaById(id) {
    const awaria = await this.awariaRepository.findOneBy({ id });
    if (awaria) return awaria;
    throw new HttpException(
      'Nie znaleziono awarii o podanym ID',
      HttpStatus.NOT_FOUND,
    );
  }

  async createAwaria(createAwariaDto: CreateAwariaDto) {
    const newAwaria = new Awaria();

    const stanowisko = await 
    
    await this.stanowiskoRepository
      .findOne({ where: { id: createAwariaDto.stanowisko } });

    if (!stanowisko)
      throw new HttpException(
        'Nie znaleziono stanowiska o podanym ID',
        HttpStatus.NOT_FOUND,
      );

    newAwaria.opis_awarii = createAwariaDto.opis_awarii;
    newAwaria.priorytet = createAwariaDto.priorytet;
    newAwaria.stanowisko = stanowisko;
    newAwaria.status = createAwariaDto.status;

    await this.awariaRepository.save(newAwaria);

    this.gateway.server.emit('newAwaria', { newAwaria });
    console.log('Nowa awaria');

    return 'Success';
  }

  async claimAwaria(id) {
    try { 
      await this.awariaRepository.update(id, {status: 2});
    } 
    catch(e) {
      throw new HttpException(
        `Nie znaleziono awarii o podanym id równym < ${id} >`,
        HttpStatus.NO_CONTENT,
      );
    }
  }

  async finishAwaria(id) {
    try { 
      await this.awariaRepository.update(id, {status: 3});
    } 
    catch(e) {
      throw new HttpException(
        `Nie znaleziono awarii o podanym id równym < ${id} >`,
        HttpStatus.NO_CONTENT,
      );
    }
  }
}
