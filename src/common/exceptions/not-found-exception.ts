import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message = 'The requested resource could not be found.') {
    super(
      {
        message,
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
