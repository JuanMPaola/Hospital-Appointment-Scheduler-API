import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UsersModule } from '../../users/users.module';
import { DatabaseModule } from '../../database/database.module';
import { UsersService } from '../../users/users.service';
import { DoctorDto } from '../../doctors/dto/doctor.dto';
import { PatientDto } from 'src/patients/dto/patient.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let userService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            validateUser: jest.fn(),
            register: jest.fn(),
          }
        },
        {
          provide: UsersService,
          useValue:{
            create: jest.fn(),
            findByEmail: jest.fn(),
          }
        }
      ],
      imports: [
        UsersModule,
        DatabaseModule,
      ]
    }).compile();

    userService = module.get<UsersService>(UsersService);
    service = module.get<AuthService>(AuthService)
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', ()  => {
    it('should return the access token if email and password are correct', async () => {
      // Simulate user registration
      const resgistUser : PatientDto & DoctorDto = {
        id: "deec3d0d-c07d-4e5c-a327-ed8f02124618",
        name: "Jane Smith",
        password: "contraseña",
        age: 34,
        phone: "123-456-7890",
        email: "jane.smith@example.com",
        born: new Date("1990-01-01T00:00:00Z"),
        role: "patient",
        specialties: [],
        week_availability: []
      };
      jest.spyOn(userService, 'create').mockResolvedValue(resgistUser);
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(resgistUser.email);
      jest.spyOn(service, 'validateUser').mockResolvedValue(resgistUser);
      // Mock the login response
      const result = {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      };

      const body = {
        email: "jane.smith@example.com",
        password: "contraseña"
      };

      jest.spyOn(service, 'login').mockResolvedValue(result);
      expect(await controller.login(body)).toBe(result);
    });


    it('should throw an error if the user is not registered', async () => {
      const body = {
        email: "unregistered@example.com",
        password: "wrongpassword"
      };
  
      jest.spyOn(service, 'login').mockRejectedValue(new Error('User not registered'));
  
      // Use .rejects.toThrow to handle the thrown error in async functions
      await expect(controller.login(body)).rejects.toThrow('User not registered');
    });

  })

  describe('register as doctor', () => { 
    it('should return the doctor values if registration was successful', async () => {
      // Mock result matching the DoctorDto structure
      const result: DoctorDto & PatientDto= {
        id: "some-doctor-id",
        name: "Dr. John Doe",
        password: "securepassword",
        age: 45,
        phone: "987-654-3210",
        email: "john.doe@example.com",
        born: new Date("1979-05-15T00:00:00Z"),
        role: "doctor",
        specialties: [1, 2], 
        week_availability: {
          1: [9, 10, 11], 
          3: [14, 15, 16] 
        }
      };
      
      // Mock body matching the expected input for DoctorDto
      const body: DoctorDto & PatientDto= {
        id: "some-doctor-id",
        name: "Dr. John Doe",
        password: "securepassword",
        age: 45,
        phone: "987-654-3210",
        email: "john.doe@example.com",
        born: new Date("1979-05-15T00:00:00Z"),
        role: "doctor",
        specialties: [1, 2],
        week_availability: {
          1: [9, 10, 11],
          3: [14, 15, 16]
        }
      };
      
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null)
      jest.spyOn(userService, 'create').mockResolvedValue(result);
      
      expect(await controller.register(body)).toBe(result);
    });
  });
});
