import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { deleteUsersResponseExample, getUserByEmailResponseExample, getUsersResponseExample, updateUsersResponseExampel } from '../../utils/examples/users.example';
import { NotFoundException } from '@nestjs/common';

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
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
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

/*   describe('update', () => {
    it('should update and return the user', async () => {
      const id = '1';
      const updateDto: UpdatePatientDto = {
        id: id,
        name: "Jane Smith",
        password: "newpassword",
        email: "jane.smith@example.com",
        age: 35,
        phone: "987-654-3210",
        born: new Date("1990-01-01T00:00:00.000Z")
      };
      const result = updateUsersResponseExampel; // Ensure this example matches the expected result
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await controller.update(id, updateDto)).toBe(result);
    });
  }); */

  describe('remove', () => {
    it('should delete and return the user', async () => {
      const id = '1';
      const result = deleteUsersResponseExample;
      jest.spyOn(service, 'delete').mockResolvedValue(result);
      expect(await controller.remove(id)).toBe(result);
    });
  });
});
