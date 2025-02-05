import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Joao da Silva', description: 'The full name of the user', required: false })
  name?: string;

  @ApiProperty({ example: 'joao@email.com', description: 'The email of the user', required: false })
  email?: string;
}
