import { PartialType } from '@nestjs/mapped-types';
import { DoctorDto } from './doctor.dto'
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';

export class UpdateDoctorDto extends PartialType(DoctorDto) {
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
    
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    specialties: number[];
  
    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    week_availability: {[key: number]: number[] };
}