import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './../users.service';
import { PatientsService } from '../../patients/patients.service';
import { DoctorsService } from '../../doctors/doctors.service';
import { DatabaseService } from '../../database/database.service';
import { MockDatabaseService } from '../../../test/mockDatabaseService';
import {
  getUserByEmailResponseExample,
  getUsersResponseExample,
} from '../../utils/examples/users.example';
import { DoctorDto } from '../../doctors/dto/doctor.dto';
import { PatientDto } from '../../patients/dto/patient.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let databaseService: jest.Mocked<MockDatabaseService>;
  let doctorsService: DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        PatientsService,
        DoctorsService,
        {
          provide: DatabaseService,
          useClass: MockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    doctorsService = module.get<DoctorsService>(DoctorsService);
    databaseService = module.get<DatabaseService>(
      DatabaseService,
    ) as jest.Mocked<MockDatabaseService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const example: DoctorDto & PatientDto = {
    id: 'some-doctor-id',
    name: 'Dr. John Doe',
    password: 'securepassword',
    age: 45,
    phone: '987-654-3210',
    email: 'john.doe@example.com',
    born: new Date('1979-05-15T00:00:00Z'),
    role: 'doctor',
    specialties: [1, 2],
    week_availability: {
      1: [9, 10, 11],
      3: [14, 15, 16],
    },
  };

  describe('create', () => {
    it('should rollback transaction and throw error if doctor creation fails', async () => {
      // Mock the database queries and doctorsService.create method
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' }) // Start transaction
        .mockResolvedValueOnce({ rows: [{ id: example.id }] }); // User created

      jest
        .spyOn(doctorsService, 'create')
        .mockRejectedValueOnce(new Error('Doctor creation failed'));

      await expect(service.create(example)).rejects.toThrow(
        'Could not create user',
      );

      // Ensure rollback is called if error occurs
      expect(databaseService.query).toHaveBeenCalledWith('ROLLBACK');
    });

    it('should throw BadRequestException for invalid role', async () => {
      const invalidUser = { ...example, role: 'invalid-role' };

      await expect(service.create(invalidUser)).rejects.toThrow(
        new InternalServerErrorException('Could not create user'),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      databaseService.query.mockResolvedValueOnce({
        rows: getUsersResponseExample,
      });
      const result = await service.findAll();
      expect(result).toBe(getUsersResponseExample);
    });
  });

  describe('findById', () => {
    it('should return the user with the same id', async () => {
      databaseService.query.mockResolvedValueOnce({
        rows: [getUserByEmailResponseExample],
      });
      const result = await service.findById(getUserByEmailResponseExample.id);
      expect(result).toBe(getUserByEmailResponseExample);
    });
  });

  describe('update', () => {
    it('should update and return user', async () => {
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' })
        .mockResolvedValueOnce({ rows: [{ id: example.id }] })
        .mockResolvedValueOnce({ command: 'UPDATE' })
        .mockResolvedValueOnce({ command: 'COMMIT' });
      jest.spyOn(service, 'findById').mockResolvedValueOnce(example);
      jest.spyOn(doctorsService, 'update').mockResolvedValueOnce(undefined);

      // Await the service update method and check the result
      const result = await service.update(example.id, example);
      expect(result).toEqual({ id: example.id, ...example });
    });

    it('should handle transaction failure and rollback', async () => {
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' })
        .mockResolvedValueOnce({ rows: [{ id: example.id }] })
        .mockRejectedValueOnce(new Error('Update failed')) // Simulate failure
        .mockResolvedValueOnce({ command: 'ROLLBACK' });

      await expect(service.update(example.id, example)).rejects.toThrow(
        'Could not update user',
      );
      expect(databaseService.query).toHaveBeenCalledWith('ROLLBACK');
    });
  });

  describe('delete', () => {
    it('should delete and return the user', async () => {
      const userId = 'some-user-id';
      const role = 'doctor'; // Assuming we're testing with a doctor

      // Mocking the sequence of database queries and service methods
      jest.spyOn(service, 'getRole').mockResolvedValueOnce(role);
      jest.spyOn(doctorsService, 'delete').mockResolvedValueOnce(undefined);
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' })
        .mockResolvedValueOnce({ rows: [{ id: userId }] })
        .mockResolvedValueOnce({ command: 'COMMIT' });

      const result = await service.delete(userId);

      expect(result).toEqual({ id: userId });
    });

    it('should handle transaction failure and rollback', async () => {
      const userId = 'some-user-id';
      databaseService.query
        .mockResolvedValueOnce({ command: 'BEGIN' })
        .mockRejectedValueOnce(new Error('Delete failed')) // Simulate failure
        .mockResolvedValueOnce({ command: 'ROLLBACK' });

      await expect(service.delete(userId)).rejects.toThrow('Delete failed');
      expect(databaseService.query).toHaveBeenCalledWith('ROLLBACK');
    });
  });
});
