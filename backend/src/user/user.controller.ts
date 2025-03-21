import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user/')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Roles('private')
  @Get()
  findAll() {
    return 'This action returns all users';
  }
}
