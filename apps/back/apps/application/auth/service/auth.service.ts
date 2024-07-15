import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "apps/domain/common/enum/role.enum";
import { AuthFailedException } from "apps/infrastructure/error";
import { compare } from "bcryptjs";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";

import { LoginWithEmailDto } from "../dto/request/login-with-email.dto";
import { LoginResultDto } from "../dto/response/login-result.dto";
import { User } from "apps/domain/user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 유저 이메일, 비밀번호로 인증 및 토큰발급
  async loginUserWithEmail(dto: LoginWithEmailDto): Promise<LoginResultDto> {
    const user = await this.authUserWithEmail(dto.email, dto.password);

    return plainToInstance(LoginResultDto, {
      token: await this.generateAccessToken(user.id),
    });
  }

  // 유저id 인증 및 토큰 발급
  async loginUserWithId(userId: number): Promise<LoginResultDto> {
    const user = await this.authUserWithIdAndRole(userId, UserRole.USER);

    return plainToInstance(LoginResultDto, {
      token: await this.generateAccessToken(user.id),
    });
  }

  // 유저 ID로 인증
  async authUserWithIdAndRole(id: number, role: UserRole): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user || !role || role !== UserRole.USER) {
      throw new AuthFailedException();
    }

    return user;
  }

  // 유저 이메일, 비밀번호로 인증
  async authUserWithEmail(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AuthFailedException();
    }

    const isAuthenticated = await compare(password, user.password);

    if (isAuthenticated) {
      return user;
    }

    throw new AuthFailedException();
  }

  // JWT 액세스 토큰 생성
  async generateAccessToken(userId: number) {
    const payload = { sub: userId, role: UserRole.USER };
    return this.jwtService.sign(payload);
  }
}
