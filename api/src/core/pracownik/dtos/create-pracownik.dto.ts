import { IsString, IsEnum } from 'class-validator';
import { Role } from 'src/core/auth/enums/role.enum';

export class CreatePracownikDto {
  @IsString()
  imie: string;
  @IsString()
  nazwisko: string;
  @IsString()
  login: string;
  @IsString()
  haslo: string;
  @IsString()
  @IsEnum(Role)
  rola: string;
}
