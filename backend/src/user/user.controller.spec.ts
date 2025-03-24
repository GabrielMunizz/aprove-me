import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { PrismaService } from 'src/prisma_service/prisma.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('user controller', () => {
    it('Should find all users', async () => {
      const mockResponse = [
        {
          id: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
          login: 'aprovame',
          password: 'aprovame',
          role: 'admin',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockResponse);

      const response = await controller.findAll();

      expect(response).toEqual(mockResponse);
    });

    it('Should create a user', async () => {
      const request = {
        login: 'aprovame',
        password: 'aprovame',
      };

      const serviceReponse = { message: 'Usuário cadastrado com sucesso!' };

      jest.spyOn(service, 'create').mockResolvedValue(serviceReponse);

      const response = await controller.createUser(request);

      expect(response).toEqual(serviceReponse);
    });
  });
});
