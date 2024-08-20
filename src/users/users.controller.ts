import { Controller, Get, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdatePatientDto } from '../patients/dto/update-patient.dto';
import { UpdateDoctorDto } from '../doctors/dto/update-doctor.dto';
import { unauthorizedResponseExample } from '../utils/examples/unauthorized.example';
import { deleteUsersResponseExample, getUserByEmailResponseExample, getUsersResponseExample, updateUsersResponseExampel, doctorUpdateExample,patientUpdateExample } from '../utils/examples/users.example';

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
  @ApiOkResponse({
    description:'',
    example: getUsersResponseExample
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find-by-email')
  @ApiOkResponse({
    description:'',
    example: getUserByEmailResponseExample
  })
  async findByEmail(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User email ${email} not found`);
    }
    return user;
  }
  
  @ApiBody({
    description: '',
    examples: {patient: patientUpdateExample, doctor: doctorUpdateExample},
  })
  @ApiOkResponse({
    description:'',
    example: updateUsersResponseExampel
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UpdatePatientDto & UpdateDoctorDto) {
    return this.usersService.update(id, user);
  }

  @ApiOkResponse({
    description:'',
    example: deleteUsersResponseExample
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
