import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [AuthModule,JwtModule],
})
export class GameModule {}
