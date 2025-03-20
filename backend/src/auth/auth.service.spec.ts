import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma_service/prisma.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwt: JwtService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UsersService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwt = module.get<JwtService>(JwtService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('auth.service', () => {
    it('Should generate a token if login is successful', async () => {
      const login = 'teste';
      const password = 'teste';
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        id: '1',
        login: 'teste',
        password: hashedPassword,
      };
      const token = 'token';

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      jest.spyOn(jwt, 'signAsync').mockResolvedValue(token);

      const result = await service.signIn(login, password);

      expect(result).toEqual({ accessToken: token });
    });
  });
});
