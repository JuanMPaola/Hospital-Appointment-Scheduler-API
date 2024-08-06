import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

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
