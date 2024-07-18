import { PartialType } from '@nestjs/mapped-types';
import { AppoinmentDto } from './create-appoinment.dto';

export class UpdateAppoinmentDto extends PartialType(AppoinmentDto) {}
