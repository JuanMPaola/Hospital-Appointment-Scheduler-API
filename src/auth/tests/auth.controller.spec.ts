import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { DoctorDto } from '../../doctors/dto/doctor.dto';
import { PatientDto } from 'src/patients/dto/patient.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            validateUser: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return the access token if email and password are correct', async () => {
      const registeredUser: PatientDto & DoctorDto = {
        id: 'deec3d0d-c07d-4e5c-a327-ed8f02124618',
        name: 'Jane Smith',
        password: 'contraseña',
        age: 34,
        phone: '123-456-7890',
        email: 'jane.smith@example.com',
        born: new Date('1990-01-01T00:00:00Z'),
        role: 'patient',
        specialties: [],
        week_availability: [],
      };

      const loginResult = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      };

      const loginBody = {
        email: 'jane.smith@example.com',
        password: 'contraseña',
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(registeredUser);
      jest.spyOn(authService, 'validateUser').mockResolvedValue(registeredUser);
      jest.spyOn(authService, 'login').mockResolvedValue(loginResult);

      expect(await controller.login(loginBody)).toBe(loginResult);
    });

    it('should throw NotFoundException if the user is not registered', async () => {
      const loginBody = {
        email: 'unregistered@example.com',
        password: 'wrongpassword',
      };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);
      await expect(controller.login(loginBody)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  const registeredDoctor: DoctorDto & PatientDto = {
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

  const registrationBody: DoctorDto & PatientDto = {
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
  describe('register', () => {
    it('should return the doctor values if registration was successful', async () => {

      // Ensure findByEmail returns null to simulate no existing user
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      // Spy on create method
      const createSpy = jest
        .spyOn(usersService, 'create')
        .mockResolvedValue(registeredDoctor);

      const result = await controller.register(registrationBody);

      // Ensure findByEmail was called with the correct email
      expect(usersService.findByEmail).toHaveBeenCalledWith(
        registrationBody.email,
      );

      // Ensure create was called with the correct arguments
      expect(createSpy).toHaveBeenCalledWith(registrationBody);

      // Ensure the result is the registered doctor
      expect(result).toEqual(registeredDoctor);

    });
    
    it('should throw NotFoundException if the user is not registered', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(registeredDoctor);
      await expect(controller.register(registrationBody)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
