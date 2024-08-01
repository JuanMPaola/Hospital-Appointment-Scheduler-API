import { Module, forwardRef } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentsController } from './appoinments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  controllers: [AppoinmentsController],
  providers: [AppoinmentsService],
  imports: [
    DatabaseModule,
    forwardRef(() => PatientsModule),
    forwardRef(() => DoctorsModule),
  ],
  exports: [AppoinmentsService],
})
export class AppoinmentsModule {}
