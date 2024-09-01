import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [DatabaseModule],
  exports: [DoctorsService],
})
export class DoctorsModule {}
