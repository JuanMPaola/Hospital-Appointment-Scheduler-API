import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../../database/database.service';
import { MockDatabaseService } from '../../../test/mockDatabaseService';
import { DoctorsService } from '../../doctors/doctors.service';
import { PatientsService } from '../../patients/patients.service';
import { UsersService } from '../../users/users.service';
import { getUserByEmailResponseExample } from '../../utils/examples/users.example';
import { loginResponseExample } from '../../utils/examples/auth.examples';
import { verify } from '../jwl';

jest.mock('../jwl');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        DoctorsService,
        PatientsService,
        {
          provide: DatabaseService,
          useClass: MockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return the user if the passwords matchs', async () => {
      jest
        .spyOn(service, 'validateUser')
        .mockResolvedValue(getUserByEmailResponseExample);
      const { password, email } = getUserByEmailResponseExample;
      const result = await service.validateUser({ password, email });
      expect(result).toBe(getUserByEmailResponseExample);
    });

    it('should return null if passwords dont match', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);
      const { email } = getUserByEmailResponseExample;
      const result = await service.validateUser({
        password: 'wrong',
        email: email,
      });
      expect(result).toBe(null);
    });
  });

  describe('login', () => {
    it('should return the access token if login is successful', async () => {
      jest.spyOn(service, 'login').mockResolvedValue(loginResponseExample);
      const result = await service.login(getUserByEmailResponseExample);
      expect(result).toEqual(loginResponseExample);
    });
  });

  describe('verifyToken', () => {
    it('should return the decoded token if the token is valid', async () => {
      const validToken = 'valid.token.here';
      const decodedToken = {
        email: 'test@example.com',
        sub: '12345',
        role: 'user',
      };

      // Mock the verify function to return a decoded token
      (verify as jest.Mock).mockReturnValue(decodedToken);

      const result = await service.verifyToken(validToken);
      expect(result).toEqual(decodedToken);
    });

    it('should throw an error if the token is invalid', async () => {
      const invalidToken = 'invalid.token.here';

      // Mock the verify function to throw an error
      (verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.verifyToken(invalidToken)).rejects.toThrow(
        'Invalid token',
      );
    });
  });
});
