import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/mysql/prisma/prisma.service';
import { RedisService } from 'src/core/database/inmemory/redis/redis.service';
import { UserDto } from './dto';
import { DBResponseService } from 'src/common/services';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private responseService: DBResponseService,
  ) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(dto: UserDto) {
    return this.responseService.handleInsertion(
      async () => {
        return this.prisma.user.create({
          data: {
            ...dto,
          },
        });
      },
    );
  }

  async deleteUser(id: number) {
    return await this.responseService.handleDelete(
      async () => {
        return this.prisma.user.delete({
          where: { id },
        });
      },
    );
  }
}
