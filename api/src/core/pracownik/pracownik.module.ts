import { Module } from '@nestjs/common';
import { PracownikService } from './services/pracownik.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PracownikController } from './controllers/pracownik.controller';
import { Pracownik } from  '../database/entities';
@Module({
  imports: [TypeOrmModule.forFeature([Pracownik])],
  providers: [PracownikService],
  exports: [PracownikService],
  controllers: [PracownikController]
})
export class PracownikModule {}
