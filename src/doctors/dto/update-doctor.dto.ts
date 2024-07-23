import { PartialType } from '@nestjs/mapped-types';
import { DoctorDto } from './doctor.dto'

export class UpdateDoctorDto extends PartialType(DoctorDto) {}