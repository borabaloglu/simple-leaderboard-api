import * as envLoader from 'load-env-var';

export const jwtConfig = {
  secret: envLoader.loadString('JWT_SECRET'),
  expiresIn: envLoader.loadString('JWT_EXPIRES_IN', { defaultValue: '1d' }),
};
