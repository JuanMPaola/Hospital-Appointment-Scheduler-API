import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    DatabaseModule,
    PatientsModule,
    DoctorsModule,
    ValidationModule
  ],
  exports: [UsersService],
})
export class UsersModule {}
