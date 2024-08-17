import { Controller, Get, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { doctorUpdateExample } from '../utils/examples';
import { patientUpdateExample } from '../utils/examples/patients.example'
import { UpdatePatientDto } from 'src/patients/dto/update-patient.dto';
import { UpdateDoctorDto } from 'src/doctors/dto/update-doctor.dto';
import { unauthorizedResponseExample } from '../utils/examples/unauthorized.example';

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unathorized Bearer Auth',
  example: unauthorizedResponseExample
})
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
  update(@Param('id') id: string, @Body() user: UpdatePatientDto & UpdateDoctorDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
