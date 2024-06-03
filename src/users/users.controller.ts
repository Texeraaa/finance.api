import { Body, Controller, Delete, Get, HttpCode, Param, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateIncomeDto } from './dto/create-income.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateInvestmentDto } from './dto/create-investments.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN && Role.USER)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @Post('/incomes')
  @Roles(Role.USER && Role.ADMIN)
  async createIncome(@Body() createIncomeDto: CreateIncomeDto, @Request() req) {
    const userID = req.user.sub
    return this.usersService.createIncome( userID,createIncomeDto);
  }

  @Delete('/incomes/:id')
  async removeIncome(@Param('id') id: string){
    return this.usersService.removeIncome(id)
  }

  @Post('/investments')
  @Roles(Role.USER && Role.ADMIN)
  async createInvestment(@Body() createInvestment: CreateInvestmentDto, @Request() req) {
    const userId = req.user.sub
    return this.usersService.createInvestiment( userId,createInvestment);
  }

  @Delete('/investments/:id')
  async removeInvestment(@Param('id') id:string){
    return this.usersService.removeInvestment(id)
  }
}
