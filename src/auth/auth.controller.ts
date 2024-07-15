import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async login(@Body() email: string, password: string) {
    
    const user = await this.authService.validateUser(email, password);
    if (!user){
      return 'Invalid credentials'
    }
    
    return this.authService.login(user);
  }

  @Post()
  async register(@Body() createAuthDto: CreateAuthDto) {
    return ;//this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return ;//this.authService.findAll();
  }

}
