import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DatabaseService } from 'src/database/database.service';
import { AppoinmentsService } from 'src/appoinments/appoinments.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, DatabaseService, AppoinmentsService],
})
export class PatientsModule {}
