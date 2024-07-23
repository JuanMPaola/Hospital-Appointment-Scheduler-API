import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PatientDto } from 'src/patients/dto/patient.dto';
import { DoctorDto } from 'src/doctors/dto/doctor.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: PatientDto & DoctorDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find-by-email')
  async findOneByEmail(@Query('email') email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User email ${email} not found`);
    }
    return user;
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    return this.usersService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
