import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() userId: string, doctor: DoctorDto) {
    return this.doctorsService.create(userId, doctor);
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() doctorDto: DoctorDto) {
    return this.doctorsService.update(+id, doctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
