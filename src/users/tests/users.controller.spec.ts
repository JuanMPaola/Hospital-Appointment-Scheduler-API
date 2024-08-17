import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { DatabaseModule } from '../../database/database.module';
import { PatientsModule } from '../../patients/patients.module';
import { DoctorsModule } from '../../doctors/doctors.module';

xdescribe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [
        DatabaseModule,
        PatientsModule,
        DoctorsModule,
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
