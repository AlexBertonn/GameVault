import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @ApiProperty({ example: 'Super Mario 64',description: 'The name of the game', required: false })
  name: string;

   @ApiProperty({ example: 'A classic game from the Nintendo 64', description: 'The description of the game', required: false })
   description: string;

   @ApiProperty({ example: 9, description: 'The rating of the game', required: false })
   rating?: number;

   @ApiProperty({ example: 'https://www.example.com/image.jpg', description: 'The image of the game', required: false })
    image?: string;
}