import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from '../patients.controller';
import { PatientsService } from '../patients.service';
import { DatabaseModule } from '../../database/database.module';
import { findaAllPatientsResponseExample } from '../../utils/examples/patients.example';

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PatientsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    controller = module.get<PatientsController>(PatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const result = findaAllPatientsResponseExample;
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should handle errors thrown by the service', async () => {
      const error = new Error('Error finding the patients');
      jest.spyOn(service, 'findAll').mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(error);
    });
  });

  describe('findOne', () => {
    it('should return the patient with the given id', async () => {
      const id = 'uuid';
      const result = { id, name: 'Test Patient' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
    });

    it('should handle errors thrown by the service', async () => {
      const error = new Error('Error finding the patient');
      jest.spyOn(service, 'findOne').mockRejectedValue(error);

      await expect(controller.findOne('uuid')).rejects.toThrow(error);
    });
  });
});
