import { Module } from '@nestjs/common';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stanowisko } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Stanowisko])],
  controllers: [StreamController],
  providers: [StreamService]
})
export class StreamModule {}