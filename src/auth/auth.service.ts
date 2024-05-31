import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn({ cpf, password }: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    if (user?.password !== password) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const payload = { sub: user.id, cpf: user.cpf, username: user.username };

    return {
      id: user.id,
      username: user.username,
      cpf: user.cpf,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
