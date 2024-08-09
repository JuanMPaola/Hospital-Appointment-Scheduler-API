import { Controller, Get, Param, } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


@ApiTags('Doctors')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unathorized Bearer Auth'
})
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}


  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Get('specialty/:specialtyId')
  findBySpecialty(@Param('specialtyId') specialtyId: number) {
    return this.doctorsService.findBySpecialty(specialtyId);
  }

  @Get(':id/availability')
  findAvailability(@Param('id') id: string) {
    return this.doctorsService.findAvailability(id);
  }
  
/*   @Post()
  create(@Body() doctor: DoctorDto) {
    return this.doctorsService.create(doctor);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() doctorDto: DoctorDto) {
    return this.doctorsService.update(+id, doctorDto);
  } */
}
