import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "apps/domain/common/enum/role.enum";
import {
  AuthFailedException,
  RuntimeException,
} from "apps/infrastructure/error";
import { compare, hashSync } from "bcryptjs";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";

import { LoginWithEmailDto } from "../dto/request/login-with-email.dto";
import { LoginResultDto } from "../dto/response/login-result.dto";
import { User } from "apps/domain/user/user.entity";
import {
  CustomResponse,
  IResponse,
} from "apps/application/common/response/response";
import { SignUpDto } from "apps/application/auth/dto/request/sign-up.dto";
import { Transactional } from "typeorm-transactional";
import { AgreementHistory } from "apps/domain/agreement/agreement-history/agreement-history.entity";
import { AgreementVersion } from "apps/domain/agreement/agreement-version/agreement-version.entity";
import { AgreementType } from "apps/domain/common/enum/agreement.enum";
import { ErrorCode, ErrorMessage } from "apps/infrastructure/error/const";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AgreementHistory)
    private readonly agreementHistoryRepository: Repository<AgreementHistory>,
    @InjectRepository(AgreementVersion)
    private readonly agreementVersionRepository: Repository<AgreementVersion>,

    private readonly jwtService: JwtService,
  ) {}

  // 유저 이메일, 비밀번호로 인증 및 토큰발급
  async loginUserWithEmail(
    dto: LoginWithEmailDto,
  ): Promise<IResponse<LoginResultDto>> {
    const user = await this.authUserWithEmail(dto.email, dto.password);

    const loginDto = plainToInstance(LoginResultDto, {
      token: await this.generateAccessToken(user.id),
    });

    return new CustomResponse<LoginResultDto>(200, "A001", loginDto);
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

  // 회원가입
  @Transactional()
  async signUp(dto: SignUpDto): Promise<IResponse<LoginResultDto>> {
    await this.validDuplicateEmail(dto.email);
    await this.validDuplicateNickName(dto.nickname);

    const user = new User();

    user.name = dto.name;
    user.email = dto.email;
    user.password = hashSync(dto.password, 10);
    user.nickname = dto.nickname;
    user.phoneNumber = dto.phoneNumber;

    user.isAgreed = dto.isAgreed;
    user.isPrivacyAgreed = dto.isPrivacyAgreed;
    user.isThirdAgreed = dto.isThirdAgreed;
    user.isMarketingAgreed = dto.isMarketingAgreed;

    const { id: userId } = await this.userRepository.save(user);

    const serviceAgreementVersion =
      await this.agreementVersionRepository.findOne({
        where: { type: AgreementType.SERVICE, inUse: true },
      });

    const privacyAgreementVersion =
      await this.agreementVersionRepository.findOne({
        where: { type: AgreementType.PRIVACY, inUse: true },
      });

    const thirdAgreementVersion = await this.agreementVersionRepository.findOne(
      {
        where: { type: AgreementType.THIRD_PARTY, inUse: true },
      },
    );

    const marketingAgreementVersion =
      await this.agreementVersionRepository.findOne({
        where: { type: AgreementType.MARKETING, inUse: true },
      });

    const agreementHistories = await Promise.all(
      [
        serviceAgreementVersion,
        privacyAgreementVersion,
        thirdAgreementVersion,
        marketingAgreementVersion,
      ].map((agreementVersion) => {
        const agreementHistory = new AgreementHistory();

        agreementHistory.userId = userId;
        agreementHistory.agreementVersionId = agreementVersion.id;

        switch (agreementVersion.type) {
          case AgreementType.SERVICE:
            agreementHistory.isAgreed = dto.isAgreed;
            break;
          case AgreementType.PRIVACY:
            agreementHistory.isAgreed = dto.isPrivacyAgreed;
            break;
          case AgreementType.THIRD_PARTY:
            agreementHistory.isAgreed = dto.isThirdAgreed;
            break;
          case AgreementType.MARKETING:
            agreementHistory.isAgreed = dto.isMarketingAgreed;
            break;
        }

        return agreementHistory;
      }),
    );

    await this.agreementHistoryRepository.save(agreementHistories);

    const loginResult = await this.loginUserWithId(userId);

    return new CustomResponse<LoginResultDto>(200, "A001", loginResult);
  }

  // JWT 액세스 토큰 생성
  async generateAccessToken(userId: number) {
    const payload = { sub: userId, role: UserRole.USER };
    return this.jwtService.sign(payload);
  }

  // 이메일 중복 체크
  async validDuplicateEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new RuntimeException(
        ErrorMessage.DUPLICATE_EMAIL,
        ErrorCode.DUPLICATE_EMAIL,
      );
    }
  }

  // 닉네임 중복 체크
  async validDuplicateNickName(nickname: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { nickname } });

    if (user) {
      throw new RuntimeException(
        ErrorMessage.DUPLICATE_NICKNAME,
        ErrorCode.DUPLICATE_NICKNAME,
      );
    }
  }
}
