import { Controller, Get } from '@nestjs/common';
import { StanowiskoService } from '../services/stanowisko.service';

@Controller('stanowiska')
export class StanowiskoController {
  constructor(private stanowiskoService: StanowiskoService) {}

  @Get('/lista')
  stanowiskoList() {
    return this.stanowiskoService.stanowiskoList();
  }
}
