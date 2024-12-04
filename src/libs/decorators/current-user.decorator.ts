import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserDocument } from '@/modules/auth/schemas/user.schema';

export interface AuthPayload {
  id: UserDocument['id'];
  username: UserDocument['username'];
}

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): AuthPayload => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
