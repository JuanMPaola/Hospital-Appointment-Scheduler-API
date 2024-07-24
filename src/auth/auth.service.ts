import { Injectable } from '@nestjs/common';
import { UsersService, } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { sign, verify } from './jwl';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async validateUser({email, password}: AuthDto): Promise<UserDto | null>{
    const user = await this.usersService.findOneByEmail(email);

    if(user && user.password === password){
      return user;
    }

    return null;
  }

  async login(user: UserDto){
    const payload = { email: user.email, sub: user.id, role:user.role}

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
