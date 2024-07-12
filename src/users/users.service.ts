import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  create(createUserDto: UserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByEmail(email: string): Promise<UserDto | undefined> {
    try {
     
    // Query to find a user by email
    const getByEmailQuery = `
    SELECT * FROM users
    WHERE email = ($1);
    `

    const result = await this.databaseService.query(getByEmailQuery, [email])

    return result.rows[0]; 
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
