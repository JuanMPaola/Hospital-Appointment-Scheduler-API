import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsObject,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class DoctorDto extends UserDto {
  id: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  specialties: number[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  week_availability: { [key: number]: number[] };
}
