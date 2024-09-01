import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdatePatientDto } from '../patients/dto/update-patient.dto';
import { UpdateDoctorDto } from '../doctors/dto/update-doctor.dto';
import { unauthorizedResponseExample } from '../utils/examples/unauthorized.example';
import {
  swaggerGetUsersResponseExample,
  swaggerGetUserByEmailResponseExample,
  swaggerUserUpdateExample,
  swaggerUserUpdateResponseExample,
  swaggerDeleteUserResponseExample,
} from '../utils/examples/users.example';

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unathorized Bearer Auth',
  example: unauthorizedResponseExample,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse(swaggerGetUsersResponseExample)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find-by-email')
  @ApiOkResponse(swaggerGetUserByEmailResponseExample)
  async findByEmail(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User email ${email} not found`);
    }
    return user;
  }

  @Patch(':id')
  @ApiBody(swaggerUserUpdateExample)
  @ApiOkResponse(swaggerUserUpdateResponseExample)
  async update(
    @Param('id') id: string,
    @Body() userPatch: UpdatePatientDto & UpdateDoctorDto,
  ) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.update(id, userPatch);
  }

  @Delete(':id')
  @ApiOkResponse(swaggerDeleteUserResponseExample)
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.delete(id);
  }
}
