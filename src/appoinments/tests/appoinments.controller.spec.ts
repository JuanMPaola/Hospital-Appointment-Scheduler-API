import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentsController } from '../appoinments.controller';
import { AppoinmentsService } from '../appoinments.service';
import { DatabaseModule } from '../../database/database.module';
import {
  getAppointmetnsResponseExample,
  getUserAppointmentsResponseExample,
  postAppointmentResponseExample,
  testingAppointmentExample,
} from '../../utils/examples/appointments.example';

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
            createNearest: jest.fn(),
            findAll: jest.fn(),
            findAllByUserId: jest.fn(),
            cancel: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
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
      // Mock the service method to return the created appointment
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(postAppointmentResponseExample);

      // Call the controller method
      const response = await controller.create(testingAppointmentExample);

      // Verify the service was called with the correct parameters
      expect(service.create).toHaveBeenCalledWith(testingAppointmentExample);

      // Verify the controller returns the expected result
      expect(response).toEqual(postAppointmentResponseExample);
    });

    it('should handle errors thrown by the service', async () => {
      const error = new Error('Error creating appointment');

      // Mock the service method to throw an error
      jest.spyOn(service, 'create').mockRejectedValue(error);

      // Call the controller method and expect it to throw the error
      await expect(
        controller.create(testingAppointmentExample),
      ).rejects.toThrow(error);

      // Verify the service was called with the correct parameters
      expect(service.create).toHaveBeenCalledWith(testingAppointmentExample);
    });
  });

  describe('nearestAppointment', () => {
    it('should create the nearest appointment for given specialtieId and patientId', async () => {
      const specialtieId = 1;
      const patientId = 'patient-uuid';
      //const mockAppointment = testingAppointmentExample;
      const mockDoctor = {
        id: '11cf6df3-2d95-4cc5-954a-aa30b2b42bc6',
        name: 'Dr. Example',
        specialties: ['Cardiology'],
      };

      const mockAppointment = {
        id: 'appointment-id',
        doctor: mockDoctor,
        patient_id: '167e51b1-57cc-4620-833e-3533d0874679',
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        day_id: 1,
        time_range_id: 17,
        status: 'pending',
      };

      // Mock the service method to return the mock appointment
      jest.spyOn(service, 'createNearest').mockResolvedValue(mockAppointment);

      // Call the controller method
      const response = await controller.nearestAppointment(
        specialtieId,
        patientId,
      );

      // Verify the service was called with the correct parameters
      expect(service.createNearest).toHaveBeenCalledWith(
        specialtieId,
        patientId,
      );

      // Verify the controller returns the expected result
      expect(response).toEqual(mockAppointment);
    });

    it('should handle errors thrown by the service', async () => {
      const specialtieId = 1;
      const patientId = 'patient-uuid';
      const error = new Error('Something went wrong');

      // Mock the service method to throw an error
      jest.spyOn(service, 'createNearest').mockRejectedValue(error);

      // Call the controller method and expect it to throw the error
      await expect(
        controller.nearestAppointment(specialtieId, patientId),
      ).rejects.toThrow(error);

      // Verify the service was called with the correct parameters
      expect(service.createNearest).toHaveBeenCalledWith(
        specialtieId,
        patientId,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      const result = getAppointmetnsResponseExample;

      // Mock the service method to return the example data
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      // Call the controller method and verify the response
      const response = await controller.findAll();
      expect(response).toEqual(result);

      // Verify the service was called
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle errors thrown by the service', async () => {
      const error = new Error('Error fetching appointments');

      // Mock the service method to throw an error
      jest.spyOn(service, 'findAll').mockRejectedValue(error);

      // Call the controller method and expect it to throw the error
      await expect(controller.findAll()).rejects.toThrow(error);

      // Verify the service was called
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllByUserId', () => {
    it('should return appointments where the user is either the doctor or the patient', async () => {
      const userId = '0718c6b8-b8e8-46e5-92f0-102da331e11c';
      const mockAppointments = getUserAppointmentsResponseExample;

      // Mock the service method to return the example data
      jest
        .spyOn(service, 'findAllByUserId')
        .mockResolvedValue(mockAppointments);

      // Call the controller method and verify the response
      const result = await controller.findAllByUserId(userId);
      expect(result).toEqual(mockAppointments);

      // Check if the user is involved in the appointments
      const hasDoctorId = result.some(
        (appointment) => appointment.doctor_id === userId,
      );
      const hasPatientId = result.some(
        (appointment) => appointment.patient_id === userId,
      );

      expect(hasDoctorId || hasPatientId).toBe(true);

      // Verify the service was called with the correct parameters
      expect(service.findAllByUserId).toHaveBeenCalledWith(userId);
    });

    it('should handle errors thrown by the service', async () => {
      const userId = '0718c6b8-b8e8-46e5-92f0-102da331e11c';
      const error = new Error('Error fetching appointments by user ID');

      // Mock the service method to throw an error
      jest.spyOn(service, 'findAllByUserId').mockRejectedValue(error);

      // Call the controller method and expect it to throw the error
      await expect(controller.findAllByUserId(userId)).rejects.toThrow(error);

      // Verify the service was called with the correct parameters
      expect(service.findAllByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('cancel', () => {
    it('should change status to canceled', async () => {
      const appointmentId = 'appointment-uuid';
      const canceledAppointment = {
        ...testingAppointmentExample,
        status: 'canceled',
      };

      // Mock the service method to return the canceled appointment
      jest.spyOn(service, 'cancel').mockResolvedValue(canceledAppointment);

      // Call the controller method and verify the response
      const response = await controller.cancel(appointmentId);
      expect(response).toEqual(canceledAppointment);

      // Verify the service was called with the correct parameters
      expect(service.cancel).toHaveBeenCalledWith(appointmentId);
    });

    it('should handle errors thrown by the service', async () => {
      const appointmentId = 'appointment-uuid';
      const error = new Error('Error canceling appointment');

      // Mock the service method to throw an error
      jest.spyOn(service, 'cancel').mockRejectedValue(error);

      // Call the controller method and expect it to throw the error
      await expect(controller.cancel(appointmentId)).rejects.toThrow(error);

      // Verify the service was called with the correct parameters
      expect(service.cancel).toHaveBeenCalledWith(appointmentId);
    });
  });

  describe('update', () => {
    it('should update an appointment', async () => {
      const appointmentId = 'appointment-uuid';
      const updateData = {
        patient_id: 'Patient uuid here',
        doctor_id: 'Doctor uuid here',
        time_range_id: 20,
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
      };
      const updatedAppointment = {
        ...testingAppointmentExample,
        ...updateData,
      };

      // Mock the service method to return the updated appointment
      jest.spyOn(service, 'update').mockResolvedValue(updatedAppointment);

      // Call the controller method and verify the response
      const response = await controller.update(appointmentId, updateData);
      expect(response).toEqual(updatedAppointment);

      // Verify the service was called with the correct parameters
      expect(service.update).toHaveBeenCalledWith(appointmentId, updateData);
    });

    it('should handle errors thrown by the service', async () => {
      const appointmentId = 'appointment-uuid';
      const updateData = {
        patient_id: 'Patient uuid here',
        doctor_id: 'Doctor uuid here',
        time_range_id: 20,
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
      };
      const error = new Error('Error updating appointment');

      // Mock the service method to throw an error
      jest.spyOn(service, 'update').mockRejectedValue(error);

      // Call the controller method and expect it to throw the error
      await expect(
        controller.update(appointmentId, updateData),
      ).rejects.toThrow(error);

      // Verify the service was called with the correct parameters
      expect(service.update).toHaveBeenCalledWith(appointmentId, updateData);
    });
  });

  describe('remove', () => {
    it('should remove an appointment', async () => {
      const appointmentId = 4;

      // Mock the service method to return a successful removal
      jest.spyOn(service, 'delete').mockResolvedValue({ deleted: true });

      // Call the controller method and verify the response
      const response = await controller.remove(appointmentId);
      expect(response).toEqual({ deleted: true });

      // Verify the service was called with the correct parameters
      expect(service.delete).toHaveBeenCalledWith(appointmentId);
    });

    it('should handle errors thrown by the service', async () => {
      const appointmentId = 4;
      const error = new Error('Error removing appointment');

      // Mock the service method to throw an error
      jest.spyOn(service, 'delete').mockRejectedValue(error);

      // Call the controller method and expect it to throw the error
      await expect(controller.remove(appointmentId)).rejects.toThrow(error);

      // Verify the service was called with the correct parameters
      expect(service.delete).toHaveBeenCalledWith(appointmentId);
    });
  });
});
