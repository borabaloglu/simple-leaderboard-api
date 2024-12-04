import Redis from 'ioredis';

import { Module } from '@nestjs/common';

import { redisConfig } from '@/libs/configs/redis.config';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: redisConfig.host,
          port: redisConfig.port,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
