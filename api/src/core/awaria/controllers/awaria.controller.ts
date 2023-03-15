import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AwariaService } from '../services/awaria.service';
import { CreateAwariaDto } from '../dtos/create-awaria.dto';

@Controller('awarie')
export class AwariaController {
  constructor(private awariaService: AwariaService) {}
  @Get('/lista')
  awariaList() {
    return this.awariaService.awariaList();
  }
  @Get(':id')
  awariaById(@Param('id') id: string) {
    return this.awariaService.awariaById(id);
  }
  @Post('/dodaj')
  createAwaria(@Body() createAwariaDto: CreateAwariaDto) {
    return this.awariaService.createAwaria(createAwariaDto);
  }
}
