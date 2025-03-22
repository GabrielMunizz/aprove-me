import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const initialAssignors = [
    {
      name: 'Testando da Silva',
      phone: '99999999999',
      document: '99999999999',
      email: 'testando@teste.com',
    },
    {
      name: 'Teste Oliveira',
      phone: '99999999999',
      document: '99999999999',
      email: 'teste@teste.com',
    },
    {
      name: 'Testinho Carvalhal',
      phone: '99999999999',
      document: '99999999999',
      email: 'testando@teste.com',
    },
  ];
  try {
    const hashedPassword = await bcrypt.hash('aprovame', 10);

    const existingUser = await prisma.users.findFirst({
      where: { login: 'aprovame' },
    });

    if (existingUser) {
      await prisma.users.update({
        where: { id: existingUser.id },
        data: {
          ...existingUser,
          role: 'admin',
        },
      });
    } else {
      const user = await prisma.users.create({
        data: {
          login: 'aprovame',
          password: hashedPassword,
          role: 'admin',
        },
      });
      console.log('Usuário criado com sucesso', user);
    }

    await prisma.assignor.createMany({
      data: initialAssignors,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void main();
