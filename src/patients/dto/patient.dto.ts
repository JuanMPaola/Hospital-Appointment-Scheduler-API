import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto'
import { ApiProperty } from '@nestjs/swagger';

export class PatientDto extends UserDto {
  
  @IsString()
  id: string;

  @IsInt()
  age: number;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDate()
  born: Date;
}