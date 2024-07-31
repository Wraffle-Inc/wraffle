import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { AgreementType } from "apps/domain/common/enum/agreement.enum";

/**
 * 약관 버전을 저장
 */
@Entity()
export class AgreementVersion extends DefaultEntity {
  @Column("enum", {
    comment: "약관 종류",
    enum: AgreementType,
    default: AgreementType.SERVICE,
  })
  type: AgreementType;

  @Column({ comment: "약관 버전" })
  version: number;

  @Column({ comment: "현재 사용 여부", default: false })
  inUse: boolean;
}
