import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentsController } from '../appoinments.controller';
import { AppoinmentsService } from '../appoinments.service';
import { DatabaseModule } from '../../database/database.module';

xdescribe('AppoinmentsController', () => {
  let controller: AppoinmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppoinmentsController],
      providers: [AppoinmentsService],
      imports: [DatabaseModule],
    }).compile();

    controller = module.get<AppoinmentsController>(AppoinmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
