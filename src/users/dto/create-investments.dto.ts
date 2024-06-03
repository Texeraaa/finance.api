// create-income.dto.ts
import {
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvestmentDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsString({ message: 'type deve ser do tipo string' })
  type: string;

  @IsDate({ message: 'date deve ser uma data válida no formato yyyy-mm-dd' })
  @Type(() => Date)
  date: Date;
}
