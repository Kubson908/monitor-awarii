import { Module } from '@nestjs/common';
import { AwariaController } from './controllers/awaria.controller';
import { AwariaService } from './services/awaria.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Awaria, Stanowisko } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Awaria]), TypeOrmModule.forFeature([Stanowisko])],
  controllers: [AwariaController],
  providers: [AwariaService]
})
export class AwariaModule {}
