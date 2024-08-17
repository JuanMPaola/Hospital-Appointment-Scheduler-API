import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from '../patients.service';
import { findaAllPatientsResponseExample } from '../../utils/examples/patients.example';
import { DatabaseService } from '../../database/database.service';
import { PatientDto } from '../dto/patient.dto';

describe('PatientsService', () => {
  let service: PatientsService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: DatabaseService,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient in the database', async () => {
      // Mock patient data
      const mockPatientDto: PatientDto = {
        id: '123',
        name: "name",
        email: "example@email.com",
        password: "password",
        role: "patient",
        age: 30,
        phone: '123-456-7890',
        born: new Date('1990-01-01'),
      };

      // Mock the database response
      const mockPatientResult = { rows: [{ id: '123', ...mockPatientDto }] };
      databaseService.query.mockResolvedValueOnce(mockPatientResult);

      // Call the create method and check the result
      const result = await service.create(mockPatientDto);
      expect(result).toEqual(mockPatientResult.rows[0]);

      // Ensure the query method is called with the right SQL and values
      expect(databaseService.query).toHaveBeenCalledWith(
        expect.any(String), // The SQL query string (you could add the actual query here if needed)
        [mockPatientDto.id, mockPatientDto.age, mockPatientDto.phone, mockPatientDto.born]
      );
    });
  });
});

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const result = findaAllPatientsResponseExample;
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
  
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne',()=>{
    it('should return the user with the id sended', async ()=>{
      const result = { id: 'uuid', name: 'Test Patient' };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await service.findOne('uuid')).toBe(result);
    })
  });

  describe('delete',()=>{

  });

  describe('update',()=>{

  });
});
