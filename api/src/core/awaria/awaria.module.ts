import { Module } from '@nestjs/common';
import { AwariaController } from './controllers/awaria.controller';
import { AwariaService } from './services/awaria.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Awaria, Stanowisko, Pracownik } from '../database/entities';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Awaria]), TypeOrmModule.forFeature([Stanowisko]), TypeOrmModule.forFeature([Pracownik])],
  controllers: [AwariaController],
  providers: [AwariaService, {provide: APP_GUARD, useClass: RolesGuard}, JwtService]
})
export class AwariaModule {}
