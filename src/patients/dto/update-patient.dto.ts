import { PartialType } from '@nestjs/mapped-types';
import { PatientDto } from './patient.dto'
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePatientDto extends PartialType(PatientDto) {
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsInt()
    age: number;
  
    @IsString()
    @IsNotEmpty()
    phone: string;
  
    @IsDate()
    born: Date;
}