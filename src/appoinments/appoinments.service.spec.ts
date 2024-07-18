import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentsService } from './appoinments.service';

describe('AppoinmentsService', () => {
  let service: AppoinmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppoinmentsService],
    }).compile();

    service = module.get<AppoinmentsService>(AppoinmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
