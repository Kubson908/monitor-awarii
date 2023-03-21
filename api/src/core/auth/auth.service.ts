import { Injectable } from '@nestjs/common';
import { PracownikService } from '../pracownik/pracownik.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private pracownikService: PracownikService,
    private jwtService: JwtService,
  ) {}
  async validatePracownik(username: string, pass: string): Promise<any> {
    const user = await this.pracownikService.pracownikByLogin(username);
    if (user && bcrypt.compare(pass, user.haslo)) {
      const { haslo, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
