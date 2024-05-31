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
        incomes: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
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

  async createIncome(data: CreateIncomeDto) {
    console.log('data', data);
    const { userId, amount, date, source } = data;
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
