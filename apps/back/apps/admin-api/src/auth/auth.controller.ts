import { Body, Controller, Post } from "@nestjs/common";
import { LoginWithEmailDto } from "apps/application/auth/dto/request/login-with-email.dto";
import { LoginResultDto } from "apps/application/auth/dto/response/login-result.dto";
import { AuthService } from "apps/application/auth/service/auth.service";
import { Public } from "apps/application/common/auth/public.decorator";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { IResponse } from "apps/application/common/response/response";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "로그인",
    operationId: "loginByEmail",
    tags: ["auth"],
  })
  @ApiOkResponse({
    type: LoginResultDto,
  })
  @Public()
  @Post("/login")
  async loginByEmail(
    @Body() dto: LoginWithEmailDto,
  ): Promise<IResponse<LoginResultDto>> {
    return this.authService.loginUserWithEmail(dto);
  }
}
