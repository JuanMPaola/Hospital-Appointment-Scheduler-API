import { forwardRef, Module } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentsController } from './appoinments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  controllers: [AppoinmentsController],
  providers: [AppoinmentsService],
  imports: [
    DatabaseModule,
    ValidationModule,
  ],
  exports: [AppoinmentsService],
})
export class AppoinmentsModule {}
