import { Exclude, Expose } from "class-transformer";

@Exclude()
export class LoginResultDto {
  @Expose()
  token: string;
}
