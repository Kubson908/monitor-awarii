import { Module } from '@nestjs/common';
import { Stanowisko } from '../database/entities';
import { TypeOrmModule } from '@nestjs/typeorm'
import { StanowiskoService } from './services/stanowisko.service';
import { StanowiskoController } from './controllers/stanowisko.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Stanowisko])],
    providers: [StanowiskoService],
    controllers: [StanowiskoController]
  })
export class StanowiskoModule {}
