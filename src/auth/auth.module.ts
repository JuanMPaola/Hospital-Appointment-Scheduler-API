import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, DatabaseService, DoctorsService, PatientsService],
})
export class AuthModule {}