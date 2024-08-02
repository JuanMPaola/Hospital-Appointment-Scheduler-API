import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { PatientDto } from 'src/patients/dto/patient.dto';
import { DoctorDto } from 'src/doctors/dto/doctor.dto';
import { SkipAuth } from './skip-auth.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { patientExample, doctorExample, patientLoginExample, doctorLoginExample } from 'src/utils/examples';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @SkipAuth()
  @ApiBody({
    description: '',
    examples: {patient: patientLoginExample, doctor: doctorLoginExample},
  })
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    
    const user = await this.authService.validateUser(authDto);
    if (!user){
      return 'Invalid credentials'
    }
    
    return this.authService.login(user);
  }

  @SkipAuth()
  @ApiBody({
    description: '',
    examples: {patient: patientExample, doctor: doctorExample},
  })
  @Post('register')
  async register(@Body() patOrDoc: PatientDto & DoctorDto) {
    return this.usersService.create(patOrDoc);
  }

}
