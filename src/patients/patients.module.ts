import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [
    DatabaseModule,
  ],
  exports: [PatientsService],
})
export class PatientsModule {}
