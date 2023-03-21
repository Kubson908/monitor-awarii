import { Module } from '@nestjs/common';
import { PracownikService } from './pracownik.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pracownik } from  '../database/entities';
@Module({
  imports: [TypeOrmModule.forFeature([Pracownik])],
  providers: [PracownikService],
  exports: [PracownikService]
})
export class PracownikModule {}
