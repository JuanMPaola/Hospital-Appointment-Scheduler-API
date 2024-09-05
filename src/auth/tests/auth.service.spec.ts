import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../../database/database.service';
import { MockDatabaseService } from '../../../test/mockDatabaseService';
import { DoctorsService } from '../../doctors/doctors.service';
import { PatientsService } from '../../patients/patients.service';
import { UsersService } from '../../users/users.service';
import { getUserByEmailResponseExample } from '../../utils/examples/users.example';
import * as jwt from '../jwt';

jest.mock('../jwt');

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

    it('should throw an error if there is an issue finding the user', async () => {
      jest
        .spyOn(service, 'validateUser')
        .mockRejectedValue(new Error('Error finding user'));

      const { email, password } = getUserByEmailResponseExample;

      await expect(service.validateUser({ email, password })).rejects.toThrow(
        'Error finding user',
      );
    });
  });

  describe('login', () => {
    it('should return the access token if login is successful', async () => {
      const signSpy = jest.spyOn(jwt, 'sign');
      signSpy.mockReturnValue('valid_access_token');

      const user = getUserByEmailResponseExample;
      const result = await service.login(user);

      expect(result).toEqual({
        access_token: 'valid_access_token',
      });
    });

    it('should throw an error if user data is incomplete (no email)', async () => {
      const invalidUser = { ...getUserByEmailResponseExample, email: null };

      await expect(service.login(invalidUser)).rejects.toThrow(
        'Invalid user data',
      );
    });

    it('should throw an error if token generation fails', async () => {
      const signSpy = jest.spyOn(jwt, 'sign');
      signSpy.mockImplementation(() => {
        throw new Error('Token generation failed');
      });

      const user = getUserByEmailResponseExample;

      await expect(service.login(user)).rejects.toThrow(
        'Token generation failed',
      );
    });

    it('should throw an error if the user object is null', async () => {
      await expect(service.login(null)).rejects.toThrow('Invalid user data');
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
      (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

      const result = await service.verifyToken(validToken);
      expect(result).toEqual(decodedToken);
    });

    it('should throw an error if the token is invalid', async () => {
      const invalidToken = 'invalid.token.here';

      // Mock the verify function to throw an error
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.verifyToken(invalidToken)).rejects.toThrow(
        'Invalid token',
      );
    });
  });
});
