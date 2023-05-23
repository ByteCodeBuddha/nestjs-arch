import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(config: ConfigService) {
    this.redisClient = new Redis({
      host: config.get('REDIS_HOST'),
      port: config.get('REDIS_PORT'),
    });

    this.redisClient.on('connect', () => {
      console.log('Redis Connected');
    });

    this.redisClient.on('disconnect', () => {
      console.log('Redis disconnected');
    });

    this.redisClient.on('error', (error) => {
      console.log(
        'Redis connection error:',
        error,
      );
    });
  }

  getRedisClient(): Redis {
    return this.redisClient;
  }
}
