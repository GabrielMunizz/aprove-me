import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
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
    }

    const user = await prisma.users.create({
      data: {
        login: 'aprovame',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('Usuário criado com sucesso', user);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void main();
