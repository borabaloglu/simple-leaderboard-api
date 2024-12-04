import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@/libs/exceptions/base.exception';

export enum AuthExceptionName {
  USERNAME_ALREADY_EXISTS_EXCEPTION = 'USERNAME_ALREADY_EXISTS_EXCEPTION',
  INVALID_CREDENTIALS_EXCEPTION = 'INVALID_CREDENTIALS_EXCEPTION',
}

export class UsernameAlreadyExistsException extends BaseException {
  constructor(username: string) {
    const name = AuthExceptionName.USERNAME_ALREADY_EXISTS_EXCEPTION;
    const status = HttpStatus.CONFLICT;
    super(name, status, `"${username}" already exists`);
  }
}

export class InvalidCredentialsException extends BaseException {
  constructor() {
    const name = AuthExceptionName.INVALID_CREDENTIALS_EXCEPTION;
    const status = HttpStatus.UNAUTHORIZED;
    super(name, status, 'Invalid credentials');
  }
}
