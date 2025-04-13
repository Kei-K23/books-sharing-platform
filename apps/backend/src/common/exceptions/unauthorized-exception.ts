import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(
    message = 'Unauthorized - Authentication is required and has failed or not been provided.',
  ) {
    super(
      {
        message,
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
