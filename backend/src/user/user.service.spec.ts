import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { PrismaService } from 'src/prisma_service/prisma.service';

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
