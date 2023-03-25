import { PriorityType } from '../../../typings/awaria.types'
import { IsString, IsNumber} from 'class-validator'

export class CreateAwariaDto {
  @IsString()
  opis_awarii: string;
  @IsNumber()
  priorytet: PriorityType;
  @IsNumber()
  stanowisko: number;
}
