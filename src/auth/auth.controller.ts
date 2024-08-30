import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { PatientDto } from '../patients/dto/patient.dto';
import { DoctorDto } from '../doctors/dto/doctor.dto';
import { SkipAuth } from './skip-auth.decorator';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGERloginExamples, SWAGGERloginResponseExample, SWAGGERregisterExamples, SWAGGERregisterResponseExamples } from '../utils/examples/auth.examples';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  @SkipAuth()
  @ApiCreatedResponse(SWAGGERloginResponseExample)
  @ApiBody(SWAGGERloginExamples)
  async login(@Body() authDto: AuthDto) {
    // Check if email is registered
    const user = await this.authService.validateUser(authDto);
    console.log(user)
    if (!user) {
      return ('User not registered');
    }

    return this.authService.login(user);
  }

  @Post('register')
  @SkipAuth()
  @ApiCreatedResponse(SWAGGERregisterResponseExamples)
  @ApiBody(SWAGGERregisterExamples)
  async register(@Body() patOrDoc: PatientDto & DoctorDto) {
    // Check if email is registered
    const existingUser = await this.usersService.findByEmail(patOrDoc.email);
    if (existingUser) {
      return ('Email already registered');
    }
    
    return this.usersService.create(patOrDoc);
  }

}
