import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { PatientDto } from '../patients/dto/patient.dto';
import { DoctorDto } from '../doctors/dto/doctor.dto';
import { SkipAuth } from './skip-auth.decorator';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { doctorLoginExample, loginResponseExample, patientLoginExample, registerDoctorExample, registerDoctorExample2, registeredResponseExamples, registerPatientExample, registerPatientExample2 } from '../utils/examples/auth.examples';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  @SkipAuth()
  @ApiCreatedResponse(loginResponseExample)
  @ApiBody({
    description: '',
    examples: { patient: patientLoginExample, doctor: doctorLoginExample },
  })
  async login(@Body() authDto: AuthDto) {
    // Check if email is registered
    const user = await this.authService.validateUser(authDto);
    if (!user) {
      throw new Error('User not registered');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @SkipAuth()
  @ApiCreatedResponse(registeredResponseExamples)
  @ApiBody({
    description: '',
    examples: { patient: registerPatientExample, patient2: registerPatientExample2, doctor: registerDoctorExample, doctor2: registerDoctorExample2 },
  })
  async register(@Body() patOrDoc: PatientDto & DoctorDto) {
    // Check if email is registered
    const existingUser = await this.usersService.findByEmail(patOrDoc.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    
    return this.usersService.create(patOrDoc);
  }

}
