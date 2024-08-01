import { IsString, IsNotEmpty, IsInt, IsDate, IsUUID } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto'
import { UUID } from 'crypto';

export class PatientDto extends UserDto {
  
  @IsString()
  @IsUUID()
  id: UUID;

  @IsInt()
  age: number;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDate()
  born: Date;
}