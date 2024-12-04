import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@/libs/exceptions/base.exception';

export enum LeaderboardExceptionName {
  USER_NOT_FOUND_EXCEPTION = 'USER_NOT_FOUND_EXCEPTION',
  USER_SCORE_ALREADY_EXISTS_EXCEPTION = 'USER_SCORE_ALREADY_EXISTS_EXCEPTION',
}

export class UserNotFoundException extends BaseException {
  constructor(userId: string) {
    const name = LeaderboardExceptionName.USER_NOT_FOUND_EXCEPTION;
    const status = HttpStatus.NOT_FOUND;
    super(name, status, `"${userId}" is not found`);
  }
}

export class UserScoreAlreadyExistsException extends BaseException {
  constructor(userId: string, gameId: string) {
    const name = LeaderboardExceptionName.USER_SCORE_ALREADY_EXISTS_EXCEPTION;
    const status = HttpStatus.CONFLICT;
    super(name, status, `User score already exists for user "${userId}" and game "${gameId}"`);
  }
}