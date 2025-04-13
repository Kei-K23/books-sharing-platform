import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(
    message = 'The server understood the request but refuses to authorize it.',
  ) {
    super(
      {
        message,
        statusCode: HttpStatus.FORBIDDEN,
        error: 'Forbidden',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
