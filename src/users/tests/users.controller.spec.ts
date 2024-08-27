import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import {
  deleteUsersResponseExample,
  getUserByEmailResponseExample,
  getUsersResponseExample,
} from '../../utils/examples/users.example';
import { NotFoundException } from '@nestjs/common';
import { DoctorDto } from 'src/doctors/dto/doctor.dto';
import { PatientDto } from 'src/patients/dto/patient.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findByEmail: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = getUsersResponseExample;
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });

    it('should handle errors thrown by the service', async () => {
      const error = new Error('Error finding users');
      jest.spyOn(service, 'findAll').mockRejectedValue(error);
      await expect(controller.findAll()).rejects.toThrow(error);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const result = getUserByEmailResponseExample;
      jest.spyOn(service, 'findByEmail').mockResolvedValue(result);
      expect(await controller.findByEmail(email)).toBe(result);
    });

    it('should throw NotFoundException if user not found', async () => {
      const email = 'notfound@example.com';
      jest.spyOn(service, 'findByEmail').mockResolvedValue(null);
      await expect(controller.findByEmail(email)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const id = '1';
    const updateDto : DoctorDto & PatientDto = {
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

    it('should update and return the user', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(updateDto)
      jest.spyOn(service, 'update').mockResolvedValue(updateDto);
      expect(await controller.update(id, updateDto)).toBe(updateDto);
    });

    it('should throw NotFoundException if the user to update is not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(undefined)
      await expect(controller.update(id, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    const id = '1';

    it('should delete and return the user', async () => {
      const result = deleteUsersResponseExample;
      jest.spyOn(service, 'findById').mockResolvedValue({id, name: "finded"})
      jest.spyOn(service, 'delete').mockResolvedValue(result);
      expect(await controller.remove(id)).toBe(result);
    });

    it('should throw NotFoundException if the user to delete is not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(undefined);
      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
