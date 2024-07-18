import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DatabaseModule } from './database/database.module';
import { DoctorsModule } from './doctors/doctors.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppoinmentsModule } from './appoinments/appoinments.module';

@Module({
  imports: [PatientsModule, DatabaseModule, DoctorsModule, UsersModule, AuthModule, AppoinmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
