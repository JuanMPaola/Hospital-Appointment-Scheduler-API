import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from '../doctors.service';
import { MockDatabaseService } from '../../../test/mockDatabaseService';
import { DatabaseService } from '../../database/database.service';

describe('DoctorsService', () => {
  let service: DoctorsService;
  let databaseService: jest.Mocked<MockDatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: DatabaseService,
          useClass: MockDatabaseService
        }

      ],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
    databaseService = module.get<DatabaseService>(DatabaseService) as jest.Mocked<MockDatabaseService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
