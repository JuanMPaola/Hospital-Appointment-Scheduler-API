import { Controller, Get, Param, } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { unauthorizedResponseExample } from '../utils/examples/unauthorized.example';
import { findAllDoctorsResponseExample, findAvailabilityResponseExample, findBySpecialtyResponseExample, findOneDoctorResponseExample } from '../utils/examples/doctors.examples';


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
  @ApiOkResponse({
    description:'',
    example: findAllDoctorsResponseExample
  })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description:'',
    example: findOneDoctorResponseExample
  })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Get('specialty/:specialtyId')
  @ApiOkResponse({
    description:'',
    example: findBySpecialtyResponseExample
  })
  findBySpecialty(@Param('specialtyId') specialtyId: number) {
    return this.doctorsService.findBySpecialty(specialtyId);
  }

  @Get(':id/availability')
  @ApiOkResponse({
    description:'',
    example: findAvailabilityResponseExample
  })
  findAvailability(@Param('id') id: string) {
    return this.doctorsService.findAvailability(id);
  }
}
