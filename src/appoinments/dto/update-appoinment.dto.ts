import { PartialType } from '@nestjs/mapped-types';
import { AppoinmentDto } from './appoinment.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateAppoinmentDto extends PartialType(AppoinmentDto) {
  @IsString()
  patient_id: string;

  @IsString()
  doctor_id: string;

  @IsDate()
  date: Date;

  @IsNumber()
  time_range_id: number;
}
