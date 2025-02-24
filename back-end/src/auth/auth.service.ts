import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    console.log(`🔍 Buscando usuário com email: ${email}`);

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      console.error(`❌ Usuário não encontrado: ${email}`);
      throw new NotFoundException('Usuário não encontrado.');
    }

    console.log(`✅ Usuário encontrado: ${user.id}`);

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      console.error(`❌ Tentativa de login com senha incorreta para usuário: ${email}`);
      throw new UnauthorizedException('Senha incorreta.');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    console.log(`✅ Usuário autenticado com sucesso: ${email}`);

    return {
      userId: user.id,
      access_token: accessToken,
    };
  }
}
