import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@/libs/exceptions/base.exception';

export enum ValidationExceptionName {
  INVALID_INPUT_EXCEPTION = 'INVALID_INPUT_EXCEPTION',
}

interface ValidationErrorDetail {
  property: string;
  message: string;
}

export class InvalidInputException extends BaseException {
  details: ValidationErrorDetail[];

  constructor(message: string, details: ValidationErrorDetail[]) {
    const name = ValidationExceptionName.INVALID_INPUT_EXCEPTION;
    const status = HttpStatus.BAD_REQUEST;
    super(name, status, message);
    this.details = details;
  }
}
