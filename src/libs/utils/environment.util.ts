import * as dotenv from 'dotenv';

import { InvalidEnvironmentException } from '@/libs/exceptions/environment.exception';

type Env = 'production' | 'staging' | 'development' | 'test';
type EnvPath = '.env.production' | '.env.staging' | '.env.development' | '.env.test';

export function loadEnvironment(baseEnvironemnt = 'development'): {
  env: Env;
  envPath: EnvPath;
  host: string;
} {
  let envPath: EnvPath;
  const host = '0.0.0.0';

  switch (baseEnvironemnt) {
    case 'production': {
      envPath = '.env.production';
      break;
    }
    case 'staging': {
      envPath = '.env.staging';
      break;
    }
    case 'development': {
      envPath = '.env.development';
      break;
    }
    case 'test': {
      envPath = '.env.test';
      break;
    }
    default: {
      throw new InvalidEnvironmentException(baseEnvironemnt);
    }
  }

  dotenv.config({
    path: envPath,
  });

  return {
    env: baseEnvironemnt as Env,
    envPath,
    host,
  };
}
