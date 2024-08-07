import { Controller, Get, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PatientDto } from 'src/patients/dto/patient.dto';
import { DoctorDto } from 'src/doctors/dto/doctor.dto';
import { doctorUpdateExample, patientUpdateExample } from 'src/utils/examples';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  
  @ApiBody({
    description: '',
    examples: {patient: patientUpdateExample, doctor: doctorUpdateExample},
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: PatientDto & DoctorDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
