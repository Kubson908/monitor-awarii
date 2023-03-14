import { Controller, Get } from '@nestjs/common';
import { AwariaService } from '../../services/awaria/awaria.service';

@Controller('awaria')
export class AwariaController {
    constructor(private awariaService:
        AwariaService) {}
    @Get('/list')
    listAwaria() {
        return this.awariaService.listAwaria();
    }
}
