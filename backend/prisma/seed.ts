import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('aprovame', 10);

    const user = await prisma.users.create({
      data: {
        login: 'aprovame',
        password: hashedPassword,
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
