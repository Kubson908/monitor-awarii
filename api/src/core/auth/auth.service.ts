import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PracownikService } from '../pracownik/services/pracownik.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private pracownikService: PracownikService,
    private jwtService: JwtService,
  ) {}
  async validatePracownik(username: string, pass: string): Promise<any> {
    const user = await this.pracownikService.pracownikByLogin(username);
    if (user && await bcrypt.compare(pass, user.haslo)) {
      const { haslo, ...result } = user;
      return result;
    }
    return null;
  }
  async login(loginDto: LoginDto) {
    const payload = { loginDto };
    return {
      access_token: this.jwtService.sign(payload, {secret: process.env.SECRET}),
    };
  }
}
