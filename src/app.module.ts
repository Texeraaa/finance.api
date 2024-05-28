import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './database/prisma.module';
import { IncomesModule } from './incomes/incomes.module';

@Module({
  imports: [UsersModule, PrismaModule, IncomesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
