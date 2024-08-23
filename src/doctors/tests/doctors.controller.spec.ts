import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from '../doctors.controller';
import { DoctorsService } from '../doctors.service';
import { DatabaseModule } from '../../database/database.module';
import { 
  findAllDoctorsResponseExample, 
  findAvailabilityResponseExample, 
  findBySpecialtyResponseExample, 
  findOneDoctorResponseExample 
} from '../../utils/examples/doctors.examples';

describe('DoctorsController', () => {
  let controller: DoctorsController;
  let service: DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [
        {
          provide: DoctorsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            findBySpecialty: jest.fn(),
            findAvailability: jest.fn(),
          },
        },
      ],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
    controller = module.get<DoctorsController>(DoctorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      const result = findAllDoctorsResponseExample;
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });

    it('should handle errors thrown by the service', async () => {
      const error = new Error('Error finding the doctors');
      jest.spyOn(service, 'findAll').mockRejectedValue(error);
      await expect(controller.findAll()).rejects.toThrow(error);
    });
  });

  describe('findOne', () => {
    it('should return a doctor with the given ID', async () => {
      const id = '1';
      const result = findOneDoctorResponseExample;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await controller.findOne(id)).toBe(result);
    });

    it('should handle errors thrown by the service', async () => {
      const id = '1';
      const error = new Error('Doctor not found');
      jest.spyOn(service, 'findOne').mockRejectedValue(error);
      await expect(controller.findOne(id)).rejects.toThrow(error);
    });
  });

  describe('findBySpecialty', () => {
    it('should return all doctors associated with a given specialty', async () => {
      const specialtyId = 1;
      const result = findBySpecialtyResponseExample;
      jest.spyOn(service, 'findBySpecialty').mockResolvedValue(result);
      expect(await controller.findBySpecialty(specialtyId)).toBe(result);
    });

    it('should handle errors thrown by the service', async () => {
      const specialtyId = 1;
      const error = new Error('Specialty not found');
      jest.spyOn(service, 'findBySpecialty').mockRejectedValue(error);
      await expect(controller.findBySpecialty(specialtyId)).rejects.toThrow(error);
    });
  });

  describe('findAvailability', () => {
    it('should return a doctor\'s weekly availability', async () => {
      const id = '1';
      const result = findAvailabilityResponseExample;
      jest.spyOn(service, 'findAvailability').mockResolvedValue(result);
      expect(await controller.findAvailability(id)).toBe(result);
    });

    it('should handle errors thrown by the service', async () => {
      const id = '1';
      const error = new Error('Doctor availability not found');
      jest.spyOn(service, 'findAvailability').mockRejectedValue(error);
      await expect(controller.findAvailability(id)).rejects.toThrow(error);
    });
  });
});
