import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Type,
  ValidationError,
} from '@nestjs/common';
import { InvalidParameterException } from 'apps/infrastructure/error';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly targetTypes?: {
      body?: Type<any>;
      query?: Type<any>;
      param?: Type<any>;
      custom?: Type<any>;
    },
  ) {}

  async transform(value: any, { metatype: _metatype, type }: ArgumentMetadata) {
    const metatype = (this.targetTypes && this.targetTypes[type]) ?? _metatype;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (!value) {
      return value;
    }

    const isDtoType = metatype.name.includes('Dto');
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      ...(isDtoType && { whitelist: true }),
    });

    /*
     * errors example
     *
     * ValidationError[]
     * [
     *  {
     *    target: {
     *      value: 1
     *    },
     *    value: 1,
     *    property: 'value',
     *    children: [ ValidationError, ValidationError, ... ],
     *    constraints: {
     *      isString: 'value must be a string'
     *    }
     *  }
     * ]
     *
     */

    if (errors.length > 0) {
      const constraints = this.extractAllConstraints(errors);

      throw new InvalidParameterException(constraints[0]);
    }

    return object;
  }

  // eslint-disable-next-line
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  // ValidationError 배열을 받아서 모든 에러메시지를 추출하여 반환
  //
  // ex) ["value should not be empty", "value must be a string"]
  private extractAllConstraints(errors: ValidationError[]): string[] {
    const result: string[] = [];
    const extractConstraintsRecursively = (
      result: string[],
      errors?: ValidationError[],
    ) => {
      errors?.forEach((error) => {
        // constraints 존재하면 result에 추가
        error.constraints &&
          Object.values(error.constraints).forEach((constraint) =>
            result.push(constraint),
          );

        // children 배열으로 재귀호출
        extractConstraintsRecursively(result, error.children);
      });
    };

    extractConstraintsRecursively(result, errors);

    return result;
  }
}
