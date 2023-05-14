import { Injectable } from '@nestjs/common';
import { Stanowisko } from 'src/core/database/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StanowiskoService {
  constructor(
    @InjectRepository(Stanowisko)
    private stanowiskoRepository: Repository<Stanowisko>,
  ) {}

  async stanowiskoList() {
    const stanowiska = await this.stanowiskoRepository.find({
      select: {
        id: true,
        kod: true,
        opis: true,
        nazwa: true,
      },
    });
    return stanowiska;
  }
}
