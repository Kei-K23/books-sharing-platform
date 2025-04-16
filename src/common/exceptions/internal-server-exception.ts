import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerException extends HttpException {
  constructor(message = 'The server encountered an unexpected condition.') {
    super(
      {
        message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Inter server error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
