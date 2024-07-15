import { Body, Controller, Post } from "@nestjs/common";
import { LoginWithEmailDto } from "apps/application/auth/dto/request/login-with-email.dto";
import { LoginResultDto } from "apps/application/auth/dto/response/login-result.dto";
import { AuthService } from "apps/application/auth/service/auth.service";
import { Public } from "apps/application/common/auth/public.decorator";
import { ApiOperation } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "로그인",
    operationId: "loginByEmail",
    tags: ["auth"],
  })
  @Public()
  @Post("/login")
  async loginByEmail(@Body() dto: LoginWithEmailDto): Promise<LoginResultDto> {
    return this.authService.loginUserWithEmail(dto);
  }
}
