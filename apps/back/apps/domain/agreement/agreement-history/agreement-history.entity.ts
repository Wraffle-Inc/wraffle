import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";

/**
 * 동의한 약관 버전을 저장
 */
@Entity()
export class AgreementHistory extends DefaultEntity {
  @Column({ comment: "동의한 유저 ID" })
  userId: number;

  @Column({ comment: "동의한 약관 버전 ID" })
  agreementVersionId: number;

  @Column({ comment: "동의 여부" })
  isAgreed: boolean;
}
