import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'cpf deve ser do tipo string' })
  @IsNotEmpty()
  cpf: string;

  @IsString({ message: 'username deve ser do tipo string' })
  @IsNotEmpty()
  username: string;

  @IsString({ message: 'password deve ser do tipo string' })
  @IsNotEmpty()
  password: string;

  @IsString({ message: 'email deve ser do tipo string' })
  @IsNotEmpty()
  email: string;

  @IsEnum(Role, {
    each: true,
    message: 'Permissão inválida, deve ser "ADMIN" ou "USER"',
  })
  roles?: Role[];
}
