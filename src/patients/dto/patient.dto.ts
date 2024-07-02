import { IsString, IsEmail, IsNotEmpty, IsOptional, IsInt, IsDate } from 'class-validator';


export class Patient {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDate()
  born: Date;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}