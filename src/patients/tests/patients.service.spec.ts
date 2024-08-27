import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from '../patients.service';
import { findaAllPatientsResponseExample } from '../../utils/examples/patients.example';
import { DatabaseService } from '../../database/database.service';
import { PatientDto } from '../dto/patient.dto';
import { deleteAppointmentsByUserIdQuery } from '../../appoinments/appoinmetns.querys';
import { UpdatePatientDto } from '../dto/update-patient.dto';

class MockDatabaseService extends DatabaseService {
  query = jest.fn();
  onModuleInit = jest.fn();
  createTables = jest.fn();
  getClient = jest.fn();
}

describe('PatientsService', () => {
  let service: PatientsService;
  let databaseService: jest.Mocked<MockDatabaseService>; // Use the mocked type

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: DatabaseService,
          useClass: MockDatabaseService, // Use the mock class here
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    databaseService = module.get<DatabaseService>(DatabaseService) as jest.Mocked<MockDatabaseService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockPatientDto: PatientDto = {
    id: '123',
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password123",
    role: "patient",
    age: 30,
    phone: '123-456-7890',
    born: new Date('1990-01-01'),
  };

  describe('create', () => {
    it('should create a patient in the database', async () => {

      const mockPatientResult = { rows: [{ id: '123', ...mockPatientDto }] };
      databaseService.query.mockResolvedValueOnce(mockPatientResult);

      const result = await service.create(mockPatientDto);
      expect(result).toEqual(mockPatientResult.rows[0]);

      expect(databaseService.query).toHaveBeenCalledWith(
        expect.any(String),
        [mockPatientDto.id, mockPatientDto.age, mockPatientDto.phone, mockPatientDto.born]
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      databaseService.query.mockResolvedValueOnce({ rows: findaAllPatientsResponseExample });

      const result = await service.findAll();
      expect(result).toEqual(findaAllPatientsResponseExample);

      expect(databaseService.query).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('findOne', () => {
    it('should return the patient with the specified id', async () => {
      const mockPatientId = 'uuid';
      const mockPatient = { id: mockPatientId, name: 'Test Patient' };

      databaseService.query.mockResolvedValueOnce({ rows: [mockPatient] });

      const result = await service.findOne(mockPatientId);
      expect(result).toEqual(mockPatient);

      expect(databaseService.query).toHaveBeenCalledWith(expect.any(String), [mockPatientId]);
    });
  });

  describe('delete', () => {
    it('should delete the patient with the specified id', async () => {
      const mockPatientId = mockPatientDto.id;
      const mockDeleteResponse = { rowCount: 1, rows: [mockPatientDto] };
  
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' })
        .mockResolvedValueOnce({command: 'DELETE'})
        .mockResolvedValueOnce(mockDeleteResponse) 
        .mockResolvedValueOnce({ command: 'COMMIT' });
  
      const result = await service.delete(mockPatientId);
  
      expect(result).toEqual(mockDeleteResponse.rows[0]);

      expect(databaseService.query).toHaveBeenCalledWith('BEGIN');
      expect(databaseService.query).toHaveBeenCalledWith(deleteAppointmentsByUserIdQuery, [mockPatientId]); // Verifica la consulta para eliminar citas
      expect(databaseService.query).toHaveBeenCalledWith(expect.stringContaining('DELETE'), [mockPatientId]);
      expect(databaseService.query).toHaveBeenCalledWith('COMMIT');
    });
  });
  
  describe('update', () => {
    it('should update the patient with the specified id', async () => {
      const mockPatientDto: UpdatePatientDto = {
        id: '123',
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "password123",
        role: "patient",
        age: 31,
        phone: '123-456-7890',
        born: new Date('1990-01-01'),
      };
  
      const mockUpdateResponse = { rows: [{ ...mockPatientDto }] };
  
      // Mocking the query method to return a specific result for different queries
      databaseService.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce(mockUpdateResponse) 
        .mockResolvedValueOnce({}); 
  
      const result = await service.update(mockPatientDto);
      expect(result).toEqual({ id: mockPatientDto.id, email: mockPatientDto.email, password: mockPatientDto.password, ...mockUpdateResponse.rows[0] });
  
      expect(databaseService.query).toHaveBeenCalledWith('BEGIN');
      expect(databaseService.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE patients'), [
        mockPatientDto.age,
        mockPatientDto.phone,
        mockPatientDto.born,
        mockPatientDto.id,
      ]);
      expect(databaseService.query).toHaveBeenCalledWith('COMMIT');
    });
  });
});