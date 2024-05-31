import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Campo cpf é obrigatório' })
  cpf: string;

  @IsNotEmpty({ message: 'Campo senha é obrigatório' })
  @IsString({ message: 'Senha inválida' })
  password: string;
}
