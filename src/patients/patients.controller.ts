import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientDto } from './dto/patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() userId: string, patient: PatientDto) {
    return this.patientsService.create(userId, patient);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() patient: PatientDto) {
    return this.patientsService.update(id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}