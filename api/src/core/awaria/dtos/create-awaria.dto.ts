import { PriorityType } from '../../../typings/awaria.types'
import { IsString, IsNumber, IsBoolean} from 'class-validator'

export class CreateAwariaDto {
  @IsBoolean()
  mozna_pracowac: boolean;
  @IsString()
  opis_awarii: string;
  @IsNumber()
  priorytet: PriorityType;
  @IsNumber()
  stanowisko: number;
}
