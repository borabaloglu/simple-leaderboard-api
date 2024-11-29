import * as envLoader from 'load-env-var';

import { loadEnvironment } from '@/libs/utils/environment.util';

const env = loadEnvironment(process.env.NODE_ENV);

export const appConfig = {
  ...env,
  port: envLoader.loadNumber('API_PORT'),
  jwtSecret: envLoader.loadString('JWT_SECRET'),
  name: 'api',
};
