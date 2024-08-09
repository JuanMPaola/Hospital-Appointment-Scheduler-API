import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Patients')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unathorized Bearer Auth'
})
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