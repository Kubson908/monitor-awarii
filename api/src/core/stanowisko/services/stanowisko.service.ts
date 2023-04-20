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

  stanowiskoList() {
    const stanowiska = this.stanowiskoRepository.find();
    return stanowiska;
  }
}
