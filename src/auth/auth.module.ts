import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, DatabaseModule],
  exports: [AuthService],
})
export class AuthModule {}
