import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Headers,
  Request,
} from '@nestjs/common';

import { AwariaService } from '../services/awaria.service';
import { CreateAwariaDto } from '../dtos/create-awaria.dto';
import { Role } from 'src/core/auth/enums/role.enum';
import { Roles } from 'src/core/decorators/roles.decorator';

@Controller('awarie')
export class AwariaController {
  constructor(private awariaService: AwariaService) {}
  @Get('/lista')
  @Roles(Role.Monitor)
  awariaList() {
    return this.awariaService.awariaList();
  }
  @Get('/ukonczone')
  @Roles(Role.Monitor)
  finishedAwariaList() {
    return this.awariaService.finishedAwariaList();
  }

  @Get('/stanowisko/:id')
  awariaListByStanowisko(@Param('id') id: string) {
    return this.awariaService.awariaListByStanowisko(id);
  }

  @Get(':id')
  awariaById(@Param('id') id: string) {
    return this.awariaService.awariaById(id);
  }
  @Post('/dodaj')
  createAwaria(@Body() createAwariaDto: CreateAwariaDto) {
    return this.awariaService.createAwaria(createAwariaDto);
  }
  @Roles(Role.Pracownik)
  @Patch('/:id/podejmij')
  claimAwaria(@Param('id') id: string, @Request() req) {
    return this.awariaService.claimAwaria(id, req);
  }
  @Roles(Role.Pracownik)
  @Patch('/:id/ukoncz')
  finishAwaria(@Param('id') id: string, @Request() req) {
    return this.awariaService.finishAwaria(id, req);
  }
}
