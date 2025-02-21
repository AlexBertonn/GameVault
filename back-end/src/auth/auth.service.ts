
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
        console.log(`User not found: ${email}`);
        throw new UnauthorizedException('Usuário não encontrado.');
    }
    const validate = await bcrypt.compare(pass, user.password);
    if (!validate) {
      console.log(`Invalid password attempt for user: ${email}`);
      throw new UnauthorizedException('Senha incorreta.');
    }
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return {
            userId:user.id,
            access_token: accessToken,
        };

  }
}
