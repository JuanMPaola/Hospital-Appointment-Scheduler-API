import { PartialType } from '@nestjs/mapped-types';
import { AppoinmentDto } from './appoinment.dto';

export class UpdateAppoinmentDto extends PartialType(AppoinmentDto) {}
