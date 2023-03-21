import { Body, Controller, Post } from '@nestjs/common';
import { CreatePracownikDto } from '../dtos/create-pracownik.dto';
import { PracownikService } from '../services/pracownik.service';

@Controller('pracownicy')
export class PracownikController {
    constructor(private pracownikService: PracownikService) {}
    @Post('/dodaj')
    addPracownik(@Body() createPracownikDto: CreatePracownikDto) {
        return this.pracownikService.addPracownik(createPracownikDto);
    }
}
