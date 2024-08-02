import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientDto } from './dto/patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@ApiBearerAuth()
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

/*   @Post()
  create(@Body() patient: PatientDto) {
    return this.patientsService.create(patient);
  }    
    @Put(':id')
  update(@Param('id') id: string, @Body() patient: PatientDto) {
    return this.patientsService.update(id, patient);
  } 
*/
}