import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        roles: true,
        incomes: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        roles: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: { ...data },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.prisma.income.deleteMany({
      where: { userId: user.id },
    });

    return this.prisma.user.delete({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        email: true,
        incomes: true,
        cpf: true,
      },
    });
  }

  async createIncome(userId: string, data: CreateIncomeDto) {
    console.log('data', data);
    const { amount, date, source } = data;
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        incomes: {
          create: {
            amount,
            source,
            date: new Date(date),
          },
        },
      },
      include: {
        incomes: true,
      },
    });
  }
}
