import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/doctor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() doctor: DoctorDto) {
    return this.doctorsService.create(doctor);
  }

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
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() doctorDto: DoctorDto) {
    return this.doctorsService.update(+id, doctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.delete(id);
  }
}
