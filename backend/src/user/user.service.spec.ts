import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { PrismaService } from 'src/prisma_service/prisma.service';

describe('UserService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user.service', () => {
    it('Should find a user', async () => {
      const user = {
        id: '1',
        login: 'teste',
        password: 'password',
        role: 'private',
      };
      jest.spyOn(prisma.users, 'findFirst').mockResolvedValue(user);

      const result = await service.findOne('teste');

      expect(result).toEqual(user);
    });
  });
});
