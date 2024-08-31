import { Controller, Post, Body, NotFoundException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { PatientDto } from '../patients/dto/patient.dto';
import { DoctorDto } from '../doctors/dto/doctor.dto';
import { SkipAuth } from './skip-auth.decorator';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { swaggerRegisterResponseExamples, swaggerRegisterExamples, swaggerLoginResponseExample, swaggerLoginExamples } from '../utils/examples/auth.examples';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  @SkipAuth()
  @ApiCreatedResponse(swaggerLoginResponseExample)
  @ApiBody(swaggerLoginExamples)
  async login(@Body() authDto: AuthDto) {
    // Check if email is registered
    const user = await this.authService.validateUser(authDto);
    if (!user) {
      throw new NotFoundException('User not registered');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @SkipAuth()
  @ApiCreatedResponse(swaggerRegisterResponseExamples)
  @ApiBody(swaggerRegisterExamples)
  async register(@Body() patOrDoc: PatientDto & DoctorDto) {
    // Check if email is registered
    const existingUser = await this.usersService.findByEmail(patOrDoc.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    
    return this.usersService.create(patOrDoc);
  }

}
