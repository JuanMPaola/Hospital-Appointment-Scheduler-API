import { forwardRef, Module } from '@nestjs/common';
import { ValidationService } from './validation.service';

@Module({
  providers: [ValidationService],
  exports: [ValidationService],
})
export class ValidationModule {}
