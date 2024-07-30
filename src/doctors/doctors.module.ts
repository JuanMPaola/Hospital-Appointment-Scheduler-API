import { Module, forwardRef } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AppoinmentsModule } from 'src/appoinments/appoinments.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    DatabaseModule,
    AppoinmentsModule,
  ],
  exports: [DoctorsService],
})
export class DoctorsModule {}
