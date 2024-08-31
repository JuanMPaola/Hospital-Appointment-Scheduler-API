import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { findOnePatientResponseExample, swaggerFindAllPatientsResponseExample, swaggerFindOnePatientResponseExample } from '../utils/examples/patients.example';
import { unauthorizedResponseExample } from '../utils/examples/unauthorized.example';

@ApiTags('Patients')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unathorized Bearer Auth',
  example: unauthorizedResponseExample
})
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOkResponse(swaggerFindAllPatientsResponseExample)
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse(swaggerFindOnePatientResponseExample)
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }
};