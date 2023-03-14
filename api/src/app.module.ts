import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AwariaModule } from './core/awaria/awaria.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AwariaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
