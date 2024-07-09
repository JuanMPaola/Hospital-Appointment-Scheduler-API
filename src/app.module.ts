import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DatabaseModule } from './database/database.module';
import { DoctorsModule } from './doctors/doctors.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PatientsModule, DatabaseModule, DoctorsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
