import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from '../doctors.service';
import { MockDatabaseService } from '../../../test/mockDatabaseService';
import { DatabaseService } from '../../database/database.service';
import { registerDoctorExample } from '../../utils/examples/auth.examples';

describe('DoctorsService', () => {
  let service: DoctorsService;
  let databaseService: jest.Mocked<MockDatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: DatabaseService,
          useClass: MockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
    databaseService = module.get<DatabaseService>(
      DatabaseService,
    ) as jest.Mocked<MockDatabaseService>;
  });

  const doctorExample = { id: 'exampleid', ...registerDoctorExample };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a doctor in database', async () => {
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' })
        .mockResolvedValueOnce({ rows: [{ user_id: doctorExample.id }] })
        .mockResolvedValueOnce({ command: 'INSERT' })
        .mockResolvedValueOnce({ command: 'INSERT' })
        .mockResolvedValueOnce({ command: 'COMMIT' });
      const result = await service.create(doctorExample);

      expect(result).toEqual({ user_id: doctorExample.id });
    });
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      databaseService.query.mockResolvedValueOnce({ rows: [doctorExample] });
      const result = await service.findAll();
      expect(result).toEqual([doctorExample]);
    });
  });

  describe('findOne', () => {
    it('should return a doctor with the respective id', async () => {
      databaseService.query.mockResolvedValueOnce({ rows: [doctorExample] });
      const result = await service.findOne(doctorExample.id);
      expect(result).toEqual(doctorExample);
    });
  });

  describe('delete', () => {
    it('should return delete the doctor with the respective id', async () => {
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' })
        .mockResolvedValueOnce({ command: 'DELETE' })
        .mockResolvedValueOnce({ command: 'DELETE' })
        .mockResolvedValueOnce({ command: 'DELETE' })
        .mockResolvedValueOnce({ rows: [doctorExample] })
        .mockResolvedValueOnce({ command: 'COMMIT' });

      const result = await service.delete(doctorExample.id);

      expect(result).toEqual(doctorExample);
    });
  });

  describe('update', () => {
    it('should update a doctor with the provided data', async () => {
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' })
        .mockResolvedValueOnce({ command: 'DELETE' })
        .mockResolvedValueOnce({ command: 'INSERT' })
        .mockResolvedValueOnce({ command: 'DELETE' })
        .mockResolvedValueOnce({ command: 'INSERT' })
        .mockResolvedValueOnce({ command: 'COMMIT' });

      const result = await service.update(doctorExample);

      expect(result).toEqual({ id: doctorExample.id, ...doctorExample });
    });
  });
});
