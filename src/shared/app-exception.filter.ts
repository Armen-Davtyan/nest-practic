import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppError } from './entity/app-error.entity';
import { ErrorCodes } from './constant/error-codes.constant';
import { ErrorMessages } from './constant/error-messages.constant';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const customErrorCode =
      exception instanceof AppError ? exception.code : ErrorCodes.SERVER_ERROR;

    const customErrorMessage =
      exception instanceof AppError
        ? exception.message
        : ErrorMessages.SERVER_ERROR;

    const httpStatus = Math.floor(customErrorCode / 1000);

    const responseBody = {
      statusCode: customErrorCode,
      message: customErrorMessage,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
