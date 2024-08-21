import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentsController } from '../appoinments.controller';
import { AppoinmentsService } from '../appoinments.service';
import { DatabaseModule } from '../../database/database.module';
import { cancelAppointmentResponseExample, getAppointmetnsResponseExample, getUserAppointmentsResponseExample, testingAppointmentExample } from '../../utils/examples/appointments.example';

describe('AppoinmentsController', () => {
  let controller: AppoinmentsController;
  let service: AppoinmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppoinmentsController],
      providers: [
        {
          provide: AppoinmentsService,
          useValue: {
            create: jest.fn(),
            nearestAppoitnment: jest.fn(),
            findAll: jest.fn(),
            findAllByUserId: jest.fn(),
            cancel: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }
        }
      ],
      imports: [DatabaseModule],
    }).compile();

    controller = module.get<AppoinmentsController>(AppoinmentsController);
    service = module.get<AppoinmentsService>(AppoinmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an appointment', async () => {
      const body = testingAppointmentExample;

      // Mock the service method to return the created appointment
      jest.spyOn(service, 'create').mockResolvedValue(body);

      // Mock the findAll method to return an array containing the created appointment
      jest.spyOn(service, 'findAll').mockResolvedValue([body]);

      const response = await controller.create(body);

      const findAll = await controller.findAll();
      const finded = findAll.some(appointment => JSON.stringify(appointment) === JSON.stringify(body));

      expect(finded).toBe(true);
      expect(response).toEqual(body);
    });

  });

  describe('nearestAppointment', () => {

  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      const result = getAppointmetnsResponseExample;
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    })
  });

  describe('findAllByUserId', () => {
    it('should return appointments where the user is either the doctor or the patient', async () => {
      const userId = '0718c6b8-b8e8-46e5-92f0-102da331e11c';
      const mockAppointments = getUserAppointmentsResponseExample;

      // Mock the service method to return the example data
      jest.spyOn(service, 'findAllByUserId').mockResolvedValue(mockAppointments);

      const result = await controller.findAllByUserId(userId);

      // Check if at least one appointment includes the userId as doctor_id or patient_id
      const hasDoctorId = result.some(appointment => appointment.doctor_id === userId);
      const hasPatientId = result.some(appointment => appointment.patient_id === userId);

      expect(hasDoctorId || hasPatientId).toBe(true);
    });
  });

  describe('cancel', () => {
    it('should change status to canceled', async () => {
      const body = testingAppointmentExample; // The appointment you are working with

      // Mock the creation and cancellation of an appointment
      jest.spyOn(service, 'create').mockResolvedValue(body);
      jest.spyOn(service, 'cancel').mockResolvedValue({
        ...body,
        status: 'canceled',
      });

      // Mock findAll to return the updated status appointment
      jest.spyOn(service, 'findAll').mockResolvedValue([
        {
          ...body,
          status: 'canceled',
        },
      ]);

      // Create the appointment
      const response = await controller.create(body);

      // Cancel the appointment (use actual IDs or data needed for your implementation)
      await controller.cancel(response.id); // Assume you pass an ID or relevant data to cancel

      // Retrieve all appointments
      const findAll = await controller.findAll();
      
      // Check if the canceled appointment's status is 'canceled'
      const canceledAppointment = findAll.find(appointment => appointment.id === response.id);
      
      expect(canceledAppointment).toBeDefined();
      expect(canceledAppointment.status).toBe('canceled');
    });
  });

  describe('update', () => {

  });

  describe('remove', () => {

  });
});
