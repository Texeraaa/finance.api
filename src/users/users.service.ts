import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { CreateInvestmentDto } from './dto/create-investments.dto';

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
        investments: true,
        bills: true,

        receivables: true,
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
        cpf: true,
        incomes: true,
        investments: true,
        bills: true,
        receivables: true,
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

    await this.prisma.investment.deleteMany({
      where: {userId: user.id}
    })

    return this.prisma.user.delete({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        email: true,
        incomes: true,
        investments: true,
        bills: true,
        receivables: true,
        cpf: true,
      },
    });
  }

  async createIncome(userId: string, data: CreateIncomeDto) {
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
        incomes: {
          select: {
            id: true,
            amount: true,
            date: true,
            source: true
          }
        },
      },
    });
  }

  async removeIncome(id: string){
    const income = await this.prisma.income.findUnique({
      where: {id: id}
    })

    if(!income){
      throw new NotFoundException("Renda não encontrada")
    }

     return await this.prisma.income.delete({
      where: {id: id},
    })
  }

  async createInvestiment(userId: string, data: CreateInvestmentDto) {
    console.log('data', data);
    const { amount, date, type } = data;
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        investments: {
          create: {
            amount,
            type,
            date: new Date(date),
          },
        },
      },
      include: {
        investments: true,
      },
    });
  }

  
  async removeInvestment(id: string){
    const investment = await this.prisma.investment.findUnique({
      where: {id: id}
    })

    if(!investment){
      throw new NotFoundException("Investimentos não encontrado")
    }

    return await this.prisma.investment.delete({
      where: {id: id},
    })
  }
}
