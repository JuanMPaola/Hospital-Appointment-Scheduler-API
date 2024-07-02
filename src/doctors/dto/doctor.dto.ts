import { IsString, IsEmail, IsNotEmpty, IsArray, ArrayNotEmpty} from 'class-validator';

export class DoctorDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    specialties: string[];

    availability: Object;
}
