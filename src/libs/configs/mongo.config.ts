import * as envLoader from 'load-env-var';

export const mongoConfig = {
  url: envLoader.loadString('DATABASE_URL'),
};
