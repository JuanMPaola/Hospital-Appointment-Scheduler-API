import { Controller, Get, Param, } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { unauthorizedResponseExample } from '../utils/examples/unauthorized.example';
import { findAvailabilityResponseExample, findBySpecialtyResponseExample, findOneDoctorResponseExample, swaggerFindAllDoctorsResponseExample, swaggerFindAvailabilityResponseExample, swaggerFindBySpecialtyResponseExample, swaggerFindOneDoctorResponseExample } from '../utils/examples/doctors.examples';


@ApiTags('Doctors')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unathorized Bearer Auth',
  example: unauthorizedResponseExample
})
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}


  @Get()
  @ApiOkResponse(swaggerFindAllDoctorsResponseExample)
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse(swaggerFindOneDoctorResponseExample)
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Get('specialty/:specialtyId')
  @ApiOkResponse(swaggerFindBySpecialtyResponseExample)
  findBySpecialty(@Param('specialtyId') specialtyId: number) {
    return this.doctorsService.findBySpecialty(specialtyId);
  }

  @Get(':id/availability')
  @ApiOkResponse(swaggerFindAvailabilityResponseExample)
  findAvailability(@Param('id') id: string) {
    return this.doctorsService.findAvailability(id);
  }
}
