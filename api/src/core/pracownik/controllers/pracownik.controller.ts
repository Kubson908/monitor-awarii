import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreatePracownikDto } from '../dtos/create-pracownik.dto';
import { PracownikService } from '../services/pracownik.service';

@Controller('pracownicy')
export class PracownikController {
    constructor(private pracownikService: PracownikService) {}
    @Get('/lista')
    pracownikList(){
        return this.pracownikService.pracownikList();
    }

    @Post('/dodaj')
    addPracownik(@Body() createPracownikDto: CreatePracownikDto) {
        return this.pracownikService.addPracownik(createPracownikDto);
    }
}
