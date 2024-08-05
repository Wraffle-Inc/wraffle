import { Injectable } from "@nestjs/common";
import { Seeder } from "nestjs-seeder";
import { InjectRepository } from "@nestjs/typeorm";
import { AgreementVersion } from "apps/domain/agreement/agreement-version/agreement-version.entity";
import { Repository } from "typeorm";
import { AgreementType } from "apps/domain/common/enum/agreement.enum";

@Injectable()
export class AgreementVersionSeed implements Seeder {
  constructor(
    @InjectRepository(AgreementVersion)
    private readonly agreementVersionRepository: Repository<AgreementVersion>,
  ) {}

  async seed(): Promise<void> {
    const agreementVersions = [
      {
        type: AgreementType.SERVICE,
        version: 1,
        inUse: true,
      },
      {
        type: AgreementType.PRIVACY,
        version: 1,
        inUse: true,
      },
      {
        type: AgreementType.THIRD_PARTY,
        version: 1,
        inUse: true,
      },
      {
        type: AgreementType.MARKETING,
        version: 1,
        inUse: true,
      },
    ];

    await this.agreementVersionRepository.save(agreementVersions);
  }

  async drop(): Promise<any> {
    return this.agreementVersionRepository.remove(
      await this.agreementVersionRepository.find(),
    );
  }
}
