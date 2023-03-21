import { IsString } from 'class-validator';

export class CreatePracownikDto {
  @IsString()
  imie: string;
  @IsString()
  nazwisko: string;
  @IsString()
  login: string;
  @IsString()
  haslo: string;
}
