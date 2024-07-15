import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

/* 400 Bad Request */
export class InvalidParameterException extends BadRequestException {
  constructor(message?: string, code?: string) {
    super(message ?? '파라미터 에러', code ?? 'INVALID_PARAMETER');
  }
}

/* 401 Unauthorized */
export class AuthFailedException extends UnauthorizedException {
  constructor(message?: string, code?: string) {
    super(message ?? '인증에 실패하였습니다.', code ?? 'AUTH_FAILED');
  }
}

export class PermissionDeniedException extends UnauthorizedException {
  constructor(message?: string, code?: string) {
    super(message ?? '권한이 없습니다.', code ?? 'PERMISSION_DENIED');
  }
}

/* 404 Not Found */
export class ResourceNotFoundException extends NotFoundException {
  constructor(message?: string, code?: string) {
    super(message ?? '리소스를 찾지 못했습니다.', code ?? 'RESOURCE_NOT_FOUND');
  }
}

/* 409 Conflict */
export class RuntimeException extends ConflictException {
  constructor(message?: string, code?: string) {
    super(message ?? '런타임 에러가 발생했습니다.', code ?? 'CONFLICT');
  }
}

/* 429 Too Many Requests */
export class TooManyRequestsException extends HttpException {
  constructor(message?: string, code?: string) {
    super(
      HttpException.createBody(
        message ?? '잠시 후 다시 요청해주세요.',
        code ?? 'TOO_MANY_REQUESTS',
        HttpStatus.TOO_MANY_REQUESTS,
      ),
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
