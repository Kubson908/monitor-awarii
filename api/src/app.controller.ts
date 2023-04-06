import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import { LocalAuthGuard } from './core/auth/local-auth.guard';
import { Public } from './core/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
