import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { ConflictException } from '../exceptions/conflict-exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal server error';

    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        const conflictException = new ConflictException();
        statusCode = conflictException.getStatus();
        const res = conflictException.getResponse() as {
          message: string;
          error: string;
        };
        message =
          typeof res === 'string' ? res : res?.message || JSON.stringify(res);
        error = res?.error;
      }
    }

    // API exceptions
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse() as { message: string; error: string };
      message =
        typeof res === 'string' ? res : res?.message || JSON.stringify(res);
      error = res?.error;
    }

    res.status(statusCode).json({
      success: false,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.url,
      message,
      error,
    });
  }
}
