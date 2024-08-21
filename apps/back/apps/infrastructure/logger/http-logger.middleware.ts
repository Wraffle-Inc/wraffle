import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ApplicationLogger } from './application.logger';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private logger: ApplicationLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const resWrite = res.write;
    const resEnd = res.end;
    const chunks: any[] = [];

    res.write = function (chunk: any, ...rest) {
      chunks.push(chunk);
      return resWrite.apply(res, [chunk, ...rest]);
    };

    res.end = function (chunk: any, ...rest) {
      if (chunk) {
        chunks.push(chunk);
      }

      return resEnd.apply(res, [chunk, ...rest]);
    };

    res.on('close', () => {
      const {
        headers: reqHeaders,
        ip,
        ips,
        method,
        originalUrl: url,
        params,
        query,
        body,
      } = res.req;
      const { statusCode, statusMessage } = res;
      const resHeaders = res.getHeaders();

      if (statusCode >= 400) {
        const errBody = JSON.parse(Buffer.concat(chunks).toString('utf8'));

        this.logger.error({
          method,
          url,
          params,
          query,
          body,
          statusCode,
          statusMessage,
          errBody,
          reqHeaders,
          resHeaders,
          ip,
          ips,
        });
      } else {
        this.logger.log({
          method,
          url,
          params,
          query,
          body,
          statusCode,
          statusMessage,
          reqHeaders,
          resHeaders,
          ip,
          ips,
        });
      }
    });

    next();
  }
}
