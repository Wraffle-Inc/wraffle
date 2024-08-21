import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TypePipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    return plainToClass(metatype, value);
  }
}
