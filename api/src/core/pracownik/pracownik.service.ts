import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pracownik } from 'src/core/database/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PracownikService {
  private pracownik: Pracownik;
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
}
