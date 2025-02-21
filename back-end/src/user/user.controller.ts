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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Public } from 'src/auth/public.decorator';
import { AuthService } from '../auth/auth.service'; 
import { LoginDto } from './dto/login.dto';

@Controller('user')
@UseGuards(JwtGuard)
@ApiBearerAuth('Authorization')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post()
  @Public()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create a user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update a user by id' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  @Public()
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login a user' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password); 
  }
}
