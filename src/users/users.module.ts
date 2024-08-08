import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { PatientsModule } from '../patients/patients.module';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    DatabaseModule,
    PatientsModule,
    DoctorsModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
