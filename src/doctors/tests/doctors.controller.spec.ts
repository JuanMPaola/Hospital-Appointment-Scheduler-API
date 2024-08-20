import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from '../doctors.controller';
import { DoctorsService } from '../doctors.service';
import { DatabaseModule } from '../../database/database.module';
import { findAllDoctorsResponseExample, findAvailabilityResponseExample, findBySpecialtyResponseExample, findOneDoctorResponseExample } from '../../utils/examples/doctors.examples';

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
            findAvailability: jest.fn()
          }
        }
      ],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService)
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
  });

  describe('findOne', () => {
    it('should return the user with the id sended', async () => {
      const id = '1';
      const result = findOneDoctorResponseExample;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await controller.findOne(id)).toBe(result);
    })
  })

  describe('findBySpecialty', () => {
    it('should return all doctors associated with one specialty', async () => {
      const specialty = 1;
      const result = findBySpecialtyResponseExample;
      jest.spyOn(service, 'findBySpecialty').mockResolvedValue(result);
      expect(await controller.findBySpecialty(specialty)).toBe(result);
    })
  })

  describe('findAvailability', () => {
    it('should return a doctos weekly availability', async () => {
      const id = "1";
      const result = findAvailabilityResponseExample;
      jest.spyOn(service, 'findAvailability').mockResolvedValue(result);
      expect(await controller.findAvailability(id)).toBe(result);
    })
  })
});

