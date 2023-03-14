import { Controller, Get } from '@nestjs/common';
import { AwariaService } from '../services/awaria.service';

@Controller('awaria')
export class AwariaController {
    constructor(private awariaService:
        AwariaService) {}
    @Get('/list')
    awariaList() {
        return this.awariaService.awariaList();
    }
}
