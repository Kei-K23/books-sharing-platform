import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(
    message = 'The request could not be completed due to a conflict with the current state.',
  ) {
    super(
      {
        message,
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}
