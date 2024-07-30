import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export interface IResponse<T> {
  status: number;
  code: string;
  data: T;
}

export function ResponseDto<D>(
  DtoClass: Type<D>,
  resourceName: string,
): Type<IResponse<D>> {
  class ResponseHost<D> implements IResponse<D> {
    @ApiProperty({ example: 200 })
    status: number;

    @ApiProperty({ example: "A001" })
    code: string;

    @ApiProperty({ type: () => DtoClass })
    data: D;

    constructor(status: number, code: string, data: D) {
      this.status = status;
      this.code = code;
      this.data = data;
    }
  }

  Object.defineProperty(ResponseHost, "name", {
    writable: false,
    value: `${resourceName}ResponseDto`,
  });

  return ResponseHost;
}

export class CustomResponse<E> implements IResponse<E> {
  status: number;
  code: string;
  data: E;

  constructor(status: number, code: string, data: E) {
    this.status = status;
    this.code = code;
    this.data = data;
  }
}
