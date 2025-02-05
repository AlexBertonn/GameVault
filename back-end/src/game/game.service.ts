import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGameDto: CreateGameDto) {
    const user = await this.prismaService.game.create({
      data: createGameDto,
    });
    return user;
  }

  async findAll() {
    const games = await this.prismaService.game.findMany();
    return games;
  }

  async findOne(id: string) {
    const game = await this.prismaService.game.findUnique({
      where: { id },
    });
    return game;
  }

  async findByUser(userId: string) {
    const games = await this.prismaService.game.findMany({
      where: { userId },
    });
    return games;
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const game = await this.prismaService.game.update({
      where: { id },
      data: updateGameDto,
    });
    return game;
  }

  async remove(id: string) {
    return this.prismaService.game.delete({
      where: { id },
    });
  }

  async complete(id: string) {
    return this.prismaService.game.update({
      where: { id },
      data: { isCompleted: true },
    });
  }

  async uncomplete(id: string) {
    return this.prismaService.game.update({
      where: { id },
      data: { isCompleted: false },
    });
  }
}
