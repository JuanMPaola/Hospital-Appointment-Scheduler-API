import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './../users.service';
import { DatabaseModule } from '../../database/database.module';
import { PatientsModule } from '../../patients/patients.module';
import { DoctorsModule } from '../../doctors/doctors.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        DatabaseModule,
        PatientsModule,
        DoctorsModule,
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
