import { Module } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentsController } from './appoinments.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AppoinmentsController],
  providers: [AppoinmentsService],
  imports: [DatabaseModule],
  exports: [AppoinmentsService],
})
export class AppoinmentsModule {}
