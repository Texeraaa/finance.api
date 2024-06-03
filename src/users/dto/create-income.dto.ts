// create-income.dto.ts
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIncomeDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsString({ message: 'source deve ser do tipo string' })
  @IsOptional()
  source?: string;

  @IsDate({ message: 'date deve ser uma data válida' })
  @Type(() => Date)
  date: Date;
}
