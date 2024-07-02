import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DatabaseModule } from './database/database.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [PatientsModule, DatabaseModule, DoctorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
