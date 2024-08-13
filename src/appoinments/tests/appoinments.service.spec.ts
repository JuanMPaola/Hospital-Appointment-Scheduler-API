import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentsService } from '../appoinments.service';
import { DatabaseModule } from '../../database/database.module';

describe('AppoinmentsService', () => {
  let service: AppoinmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppoinmentsService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<AppoinmentsService>(AppoinmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
