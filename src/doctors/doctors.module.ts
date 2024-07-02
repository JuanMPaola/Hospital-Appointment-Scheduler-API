import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService, DatabaseService],
})
export class DoctorsModule {}
