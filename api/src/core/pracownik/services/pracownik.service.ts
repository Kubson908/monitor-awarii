import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pracownik } from 'src/core/database/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePracownikDto } from '../dtos/create-pracownik.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class PracownikService {
  constructor(
    @InjectRepository(Pracownik)
    private pracownikRepository: Repository<Pracownik>,
  ) {}
  async pracownikByLogin(login: string): Promise<Pracownik> {
    const pracownik = await this.pracownikRepository.findOneBy({
      login: login,
    });
    return pracownik;
  }
  async addPracownik(createPracownikDto: CreatePracownikDto) {
    let newPracownik = new Pracownik();
    if (await this.pracownikRepository.findOneBy({login: createPracownikDto.login})) {
        throw new HttpException("Pracownik o takim loginie już istnieje", HttpStatus.CONFLICT);
    }
    newPracownik.imie = createPracownikDto.imie
    newPracownik.nazwisko = createPracownikDto.nazwisko
    newPracownik.login = createPracownikDto.login
    newPracownik.haslo = await bcrypt.hash(createPracownikDto.haslo, 10)
    newPracownik.rola = createPracownikDto.rola
    await this.pracownikRepository.save(newPracownik);
  }
}
