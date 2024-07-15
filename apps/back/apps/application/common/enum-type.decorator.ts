import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

/*
 *  ex)
 *
 *  export class UserDto {
 *    @Expose()
 *    @EnumType(Role, 'Role')
 *    role: Role
 *  }
 *
 */
export function EnumType(enumType: any, enumName: string) {
  return applyDecorators(ApiProperty({ enum: enumType, enumName }));
}
