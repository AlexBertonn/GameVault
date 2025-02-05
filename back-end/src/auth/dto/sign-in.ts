import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: 'joao@email.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'The password of the user' })
  @IsString()
  password: string;
}
