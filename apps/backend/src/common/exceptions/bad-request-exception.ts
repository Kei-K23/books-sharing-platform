import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(
    message = 'The server cannot process the request due to client error.',
  ) {
    super(
      {
        message,
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
