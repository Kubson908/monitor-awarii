import { PriorityType, StatusType } from '../../../typings/awaria.types'
import { IsString, IsNumber} from 'class-validator'

export class CreateAwariaDto {
  @IsString()
  opis_awarii: string;
  @IsNumber()
  status: StatusType;
  @IsNumber()
  priorytet: PriorityType;
  @IsNumber()
  stanowisko: number;
}
