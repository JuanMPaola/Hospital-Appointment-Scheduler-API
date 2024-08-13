import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from '../patients.service';
import { DatabaseModule } from '../../database/database.module';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService],
      imports: [DatabaseModule]
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
