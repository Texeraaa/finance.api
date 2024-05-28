import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsString({ message: 'source deve ser do tipo string' })
  @IsOptional()
  source: string;
}
