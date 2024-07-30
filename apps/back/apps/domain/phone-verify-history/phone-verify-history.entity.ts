import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";

@Entity()
export class PhoneVerifyHistory extends DefaultEntity {
  @Column({ comment: "인증요청 전화번호" })
  phoneNumber: string;

  @Column({ comment: "인증코드" })
  code: string;

  @Column({ nullable: true, comment: "인증일자" })
  verifiedAt?: Date;

  @Column({ comment: "인증여부", default: false })
  isVerified: boolean;

  @Column({ comment: "인증 만료일자" })
  expiredAt: Date;
}
