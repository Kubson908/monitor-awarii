import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AwariaModule } from './core/awaria/awaria.module';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './core/auth/auth.module';
import { AuthService } from './core/auth/auth.service';
import { PracownikModule } from './core/pracownik/pracownik.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_Config } from './core/database/config/database.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './core/auth/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { StreamModule } from './core/stream/stream.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AwariaModule,
    GatewayModule,
    AuthModule,
    PracownikModule,
    TypeOrmModule.forRoot(DB_Config),
    StreamModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, {provide: APP_GUARD, useClass: JwtGuard}, JwtService],
})
export class AppModule {}
