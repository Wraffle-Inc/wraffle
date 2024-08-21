import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';

export class ErrorResponse {
  @ApiProperty()
  public status: number;

  @ApiProperty()
  public code: string;

  @ApiProperty()
  public message: string;

  constructor(exception: HttpException) {
    this.status = exception.getStatus();
    this.code = exception.getResponse()['error'];
    this.message = exception.getResponse()['message'];
  }

  toJson() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
    };
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = new ErrorResponse(exception);

    response.status(errorResponse.status).json(errorResponse.toJson());
  }
}
