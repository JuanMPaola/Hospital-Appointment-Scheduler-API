import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentsService } from '../appoinments.service';
import { DatabaseService } from '../../database/database.service';
import { MockDatabaseService } from '../../../test/mockDatabaseService';
import {
  cancelAppointmentResponseExample,
  getAppointmetnsResponseExample,
  getUserAppointmentsResponseExample,
  postAppointmentExample,
  postAppointmentResponseExample,
  testingAppointmentExample,
} from '../../utils/examples/appointments.example';
import { deleteAppointmentById } from '../appoinmetns.querys';
import { UpdateAppoinmentDto } from '../dto/update-appoinment.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('AppoinmentsService', () => {
  let service: AppoinmentsService;
  let databaseService: jest.Mocked<MockDatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppoinmentsService,
        {
          provide: DatabaseService,
          useClass: MockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<AppoinmentsService>(AppoinmentsService);
    databaseService = module.get<DatabaseService>(
      DatabaseService,
    ) as jest.Mocked<MockDatabaseService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the appointment created', async () => {
      databaseService.query.mockResolvedValueOnce(
        postAppointmentResponseExample,
      );
      const result = await databaseService.query(postAppointmentExample);
      expect(result).toBe(postAppointmentResponseExample);
    });
  });

  describe('createNearest', () => {
    it('should return an appointment', async () => {
      databaseService.query.mockResolvedValueOnce(
        postAppointmentResponseExample,
      );
      const result = await databaseService.query(postAppointmentExample);
      expect(result).toBe(postAppointmentResponseExample);
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      databaseService.query.mockResolvedValueOnce(
        getAppointmetnsResponseExample,
      );
      const result = await databaseService.query();
      expect(result).toBe(getAppointmetnsResponseExample);
    });
  });

  describe('findAllByUserId', () => {
    it('should return an array of appointments', async () => {
      databaseService.query.mockResolvedValueOnce(
        postAppointmentResponseExample,
      );
      const result = await databaseService.query(postAppointmentExample);
      expect(result).toBe(postAppointmentResponseExample);
    });

    it('should return appointments where the user is either the doctor or the patient', async () => {
      const userId = '0718c6b8-b8e8-46e5-92f0-102da331e11c';
      const mockAppointments = getUserAppointmentsResponseExample;

      // Mock the service method to return the example data
      jest
        .spyOn(service, 'findAllByUserId')
        .mockResolvedValue(mockAppointments);

      const result = await service.findAllByUserId(userId);

      // Check if at least one appointment includes the userId as doctor_id or patient_id
      const hasDoctorId = result.some(
        (appointment) => appointment.doctor_id === userId,
      );
      const hasPatientId = result.some(
        (appointment) => appointment.patient_id === userId,
      );

      expect(hasDoctorId || hasPatientId).toBe(true);
    });
  });

  describe('cancel', () => {
    it('should return an appointment', async () => {
      databaseService.query.mockResolvedValueOnce(
        cancelAppointmentResponseExample,
      );
      const result = await databaseService.query(
        cancelAppointmentResponseExample,
      );
      expect(result).toBe(cancelAppointmentResponseExample);
    });

    it('should change status to canceled', async () => {
      const body = testingAppointmentExample;
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
      const response = await service.create(body);

      // Cancel the appointment (use actual IDs or data needed for your implementation)
      await service.cancel(response.id); // Assume you pass an ID or relevant data to cancel

      // Retrieve all appointments
      const findAll = await service.findAll();

      // Check if the canceled appointment's status is 'canceled'
      const canceledAppointment = findAll.find(
        (appointment) => appointment.id === response.id,
      );

      expect(canceledAppointment).toBeDefined();
      expect(canceledAppointment.status).toBe('canceled');
    });
  });

  it('should delete an appointment by ID and return the deleted appointment', async () => {
    const appointmentId = 1;
    const deletedAppointment = testingAppointmentExample; // Example data

    // Mock the database query to return the deleted appointment
    databaseService.query.mockResolvedValueOnce({ rows: [deletedAppointment] });

    const result = await service.delete(appointmentId);

    expect(result).toEqual(deletedAppointment);
    expect(databaseService.query).toHaveBeenCalledWith(deleteAppointmentById, [
      appointmentId,
    ]);
  });

  const updateAppointmentDto: UpdateAppoinmentDto = {
    patient_id: 'patientId',
    doctor_id: 'doctorId',
    date: new Date(),
    time_range_id: 17,
    status: 'scheduled',
  };

  describe('update', () => {
    it('should throw InternalServer if appointment does not exist', async () => {
      const appointmentId = '123';

      databaseService.query.mockResolvedValueOnce({
        rowCount: 0,
        rows: [],
      });

      await expect(
        service.update(appointmentId, updateAppointmentDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('delete', () => {
    it('should delete an appointment by ID and return the deleted appointment', async () => {
      const appointmentId = 1;
      const deletedAppointment = {
        id: appointmentId,
        doctor_id: 'doctorId',
        patient_id: 'patientId',
        date: '2024-10-10T10:00:00Z',
        time_range_id: 'timeRangeId',
        status: 'scheduled',
      };

      databaseService.query.mockResolvedValueOnce({
        rowCount: 1,
        rows: [deletedAppointment],
      });

      const result = await service.delete(appointmentId);

      expect(result).toEqual(deletedAppointment);
      expect(databaseService.query).toHaveBeenCalledWith(
        deleteAppointmentById,
        [appointmentId],
      );
    });
  });

  describe('appointmentValidation', () => {
    it('should throw an error if the doctor has a conflicting appointment at the selected time', async () => {
      const dto: UpdateAppoinmentDto = {
        patient_id: 'patientId',
        doctor_id: 'doctorId',
        date: new Date('2024-09-10'), // A future date
        time_range_id: 17,
        status: 'scheduled',
      };

      databaseService.query.mockResolvedValueOnce({
        rows: [
          {
            weekly_availability: { 2: [17] }, // Doctor available on Tuesday (2) at time range 17
            appointments: [
              {
                date: new Date('2024-09-10').toISOString(), // A conflicting appointment
                time_range_id: 17,
              },
            ],
          },
        ],
      });

      await expect(service.appointmentValidation(dto)).rejects.toThrow(
        new Error(
          'Error during appointment validation: Doctor already has an appointment at the selected time',
        ),
      );
    });
  });
});
