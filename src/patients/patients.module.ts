import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, DatabaseService],
})
export class PatientsModule {}
