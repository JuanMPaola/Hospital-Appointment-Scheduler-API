import { Module, forwardRef } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { AppoinmentsModule } from 'src/appoinments/appoinments.module';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [
    DatabaseModule,
    DoctorsModule,
    AppoinmentsModule,
  ],
  exports: [PatientsService],
})
export class PatientsModule {}
