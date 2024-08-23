import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentsService } from '../appoinments.service';
import { DatabaseModule } from '../../database/database.module';

xdescribe('AppoinmentsService', () => {
  let service: AppoinmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppoinmentsService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<AppoinmentsService>(AppoinmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
/*
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
  }); */
});
