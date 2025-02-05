import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('game')
@UseGuards(JwtGuard)
@ApiBearerAuth('Authorization')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @ApiBody({ type: CreateGameDto })
  @ApiOperation({ summary: 'Create a game' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a game by id' })
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all games by user id' })
  findByUser(@Param('userId') userId: string) {
    return this.gameService.findByUser(userId);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateGameDto })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a game by id' })
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete a game by id' })
  complete(@Param('id') id: string) {
    return this.gameService.complete(id);
  }

  @Post(':id/uncomplete')
  @ApiOperation({ summary: 'Uncomplete a game by id' })
  uncomplete(@Param('id') id: string) {
    return this.gameService.uncomplete(id);
  }
}
