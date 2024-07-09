import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto'

export class PatientDto extends UserDto {
  @IsInt()
  age: number;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDate()
  born: Date;
}