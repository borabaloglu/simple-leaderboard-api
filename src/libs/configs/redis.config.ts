import * as envLoader from 'load-env-var';

export const redisConfig = {
  host: envLoader.loadString('REDIS_HOST'),
  port: envLoader.loadNumber('REDIS_PORT'),
};
