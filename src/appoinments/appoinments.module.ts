import { Module } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentsController } from './appoinments.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AppoinmentsController],
  providers: [AppoinmentsService, DatabaseService],
})
export class AppoinmentsModule {}
