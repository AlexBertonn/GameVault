import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsUUID,
} from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'Super Mario 64',description: 'The name of the game' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'A classic game from the Nintendo 64', description: 'The description of the game' })
  @IsString()
  description: string;
  
  @ApiProperty({ example: 9, description: 'The rating of the game' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating?: number;

  @ApiProperty({ example: 'https://www.example.com/image.jpg', description: 'The image of the game' })
    @IsOptional()
    @IsString()
    image?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The user id' })
    @IsUUID()
    userId: string;
}
