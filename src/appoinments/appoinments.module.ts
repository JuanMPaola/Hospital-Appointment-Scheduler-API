import { Module } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentsController } from './appoinments.controller';
import { DatabaseService } from 'src/database/database.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AppoinmentsController],
  providers: [AppoinmentsService, DatabaseService],
})
export class AppoinmentsModule {}
