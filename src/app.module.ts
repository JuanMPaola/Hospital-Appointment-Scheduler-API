import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { DatabaseModule } from './database/database.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppoinmentsModule } from './appoinments/appoinments.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [PatientsModule, DatabaseModule, DoctorsModule, UsersModule, AuthModule, AppoinmentsModule, ValidationModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
