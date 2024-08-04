import { Module, forwardRef } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [
    DatabaseModule,
    ValidationModule
  ],
  exports: [PatientsService],
})
export class PatientsModule {}
