import { Body, Controller, Post } from "@nestjs/common";
import { LoginWithEmailDto } from "apps/application/auth/dto/request/login-with-email.dto";
import { LoginResultDto } from "apps/application/auth/dto/response/login-result.dto";
import { AuthService } from "apps/application/auth/service/auth.service";
import { Public } from "apps/application/common/auth/public.decorator";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import {
  IResponse,
  ResponseDto,
} from "apps/application/common/response/response";
import { SignUpDto } from "apps/application/auth/dto/request/sign-up.dto";

@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "로그인",
    operationId: "loginByEmail",
    tags: ["auth"],
  })
  @ApiOkResponse({
    type: ResponseDto(LoginResultDto, "LoginResult"),
  })
  @Public()
  @Post("/login")
  async loginByEmail(
    @Body() dto: LoginWithEmailDto,
  ): Promise<IResponse<LoginResultDto>> {
    return this.authService.loginUserWithEmail(dto);
  }

  @ApiOperation({
    summary: "회원가입",
    operationId: "signUp",
    tags: ["auth"],
  })
  @ApiOkResponse({
    type: ResponseDto(LoginResultDto, "LoginResult"),
  })
  @Public()
  @Post("/signup")
  async signUp(@Body() dto: SignUpDto): Promise<IResponse<LoginResultDto>> {
    return this.authService.signUp(dto);
  }
}
