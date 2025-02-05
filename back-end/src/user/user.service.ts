import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      }
    });
    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  findOne(id: string) {
    const user = this.prismaService.user.findUnique({
      where: { id },
    });
    return user;
  }

  findOneByEmail(email: string) {
    const user = this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
