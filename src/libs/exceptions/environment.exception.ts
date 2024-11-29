import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@/libs/exceptions/base.exception';

export enum EnvironmentExceptionName {
  INVALID_ENVIRONMENT_EXCEPTION = 'INVALID_ENVIRONMENT_EXCEPTION',
}

export class InvalidEnvironmentException extends BaseException {
  constructor(baseEnvironment: string) {
    const name = EnvironmentExceptionName.INVALID_ENVIRONMENT_EXCEPTION;
    const status = HttpStatus.BAD_REQUEST;
    super(name, status, `${baseEnvironment} is not a valid environment`);
  }
}
