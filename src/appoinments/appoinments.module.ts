import { Module } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentsController } from './appoinments.controller';
import { DatabaseService } from 'src/database/database.service';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';


@Module({
  /* imports: [PatientsModule, DoctorsModule], */
  controllers: [AppoinmentsController],
  providers: [AppoinmentsService, DatabaseService, DoctorsService],
})
export class AppoinmentsModule {}
