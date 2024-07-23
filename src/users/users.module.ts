import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from 'src/database/database.service';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { AppoinmentsService } from 'src/appoinments/appoinments.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabaseService, PatientsService, DoctorsService, AppoinmentsService],
})
export class UsersModule {}
