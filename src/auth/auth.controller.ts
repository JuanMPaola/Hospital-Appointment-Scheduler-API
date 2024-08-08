import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { PatientDto } from '../patients/dto/patient.dto';
import { DoctorDto } from '../doctors/dto/doctor.dto';
import { SkipAuth } from './skip-auth.decorator';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { patientExample, doctorExample, patientLoginExample, doctorLoginExample, doctorExample2, patientExample2, registeredExamples, loginResponseExample } from '../utils/examples';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @SkipAuth()
  @ApiCreatedResponse(loginResponseExample)
  @ApiBody({
    description: '',
    examples: {patient: patientLoginExample, doctor: doctorLoginExample},
  })
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    
    const user = await this.authService.validateUser(authDto);
    if (!user){
      return 'User not registered'
    }
    
    return this.authService.login(user);
  }

  @SkipAuth()
  @ApiCreatedResponse(registeredExamples)
  @ApiBody({
    description: '',
    examples: {patient: patientExample,patient2: patientExample2, doctor: doctorExample, doctor2: doctorExample2},
  })
  @Post('register')
  async register(@Body() patOrDoc: PatientDto & DoctorDto) {
    return this.usersService.create(patOrDoc);
  }

}
