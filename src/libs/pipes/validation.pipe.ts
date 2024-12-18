import _ from 'lodash';

import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { InvalidInputException } from '@/libs/exceptions/validation.exception';

export function extractAllErrors(validationError: ValidationError, errors: string[]) {
  if (validationError.constraints) {
    const mappedErrors = _.map(validationError.constraints, (value) => value);
    errors.push(...mappedErrors);
  }

  if (!validationError.children || (validationError.children && validationError.children.length === 0)) {
    return _.flattenDeep(errors);
  }

  return _.chain(validationError.children)
    .map((child) => extractAllErrors(child, errors))
    .flattenDeep()
    .value();
}

const validationPipeConfig = {
  transform: true,
  whitelist: true,
  exceptionFactory: (validationErrors: ValidationError[]) => {
    const errors = _.chain(validationErrors)
      .map((error) => extractAllErrors(error, []))
      .flattenDeep()
      .uniq()
      .value();

    const details = _.chain(validationErrors)
      .map((error) => {
        return {
          property: error.property,
          message: _.chain(error.constraints)
            .map((value) => value)
            .join(',')
            .value(),
        };
      })
      .flattenDeep()
      .value();

    return new InvalidInputException(errors.join(','), details);
  },
};

export const validationPipe = new ValidationPipe(validationPipeConfig);
