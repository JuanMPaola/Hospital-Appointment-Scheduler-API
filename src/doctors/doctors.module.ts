import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DatabaseService } from 'src/database/database.service';
import { AppoinmentsService } from 'src/appoinments/appoinments.service';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService, DatabaseService, AppoinmentsService],
/*   exports:[DoctorsService], */
})
export class DoctorsModule {}
