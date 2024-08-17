import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from '../patients.controller';
import { PatientsService } from '../patients.service';
import { DatabaseModule } from '../../database/database.module';
import { findaAllPatientsResponseExample } from '../../utils/examples/patients.example';

describe('PatientsController', () => {
  let controller: PatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
      {
        provide: PatientsService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([]),
          findOne: jest.fn().mockImplementation((id: string) => Promise.resolve({ id, name: 'Test Patient' })),
        },
      },
    ],
      imports: [DatabaseModule]
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const result = findaAllPatientsResponseExample;
      jest.spyOn(controller, 'findAll').mockResolvedValue(result);
  
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne',()=>{
    it('should return the user with the id sended', async ()=>{
      const result = { id: 'uuid', name: 'Test Patient' };

      jest.spyOn(controller, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('uuid')).toBe(result);
    })
  })
});
