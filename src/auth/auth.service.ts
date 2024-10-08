import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { sign, verify } from './jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser({ email, password }: AuthDto): Promise<UserDto | null> {
    try {
      const user = await this.usersService.findByEmail(email);

      if (user && user.password === password) {
        return user;
      }

      return null;
    } catch (error) {
      throw new Error('Error finding user');
    }
  }

  async login(user: UserDto) {
    if (!user || !user.email) {
      throw new Error('Invalid user data');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: sign(payload),
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = verify(token);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
