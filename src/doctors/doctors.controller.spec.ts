import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { DatabaseModule } from '../database/database.module';

describe('DoctorsController', () => {
  let controller: DoctorsController;
  let service : DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [DoctorsService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService)
    controller = module.get<DoctorsController>(DoctorsController);
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      const result = ['test'];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
})
