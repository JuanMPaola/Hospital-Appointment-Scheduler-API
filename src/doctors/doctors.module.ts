import { Module, forwardRef } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AppoinmentsModule } from 'src/appoinments/appoinments.module';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    DatabaseModule,
    ValidationModule
  ],
  exports: [DoctorsService],
})
export class DoctorsModule {}
