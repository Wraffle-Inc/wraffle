import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { ApplyStatus } from "apps/domain/common/enum/apply.enum";
import { PaymentMethod } from "apps/domain/common/enum/payment.enum";
import { ApplyDetail } from "apps/domain/apply/apply-detail.entity";
import { ApplyPayment } from "apps/domain/apply/apply-payment.entity";
import { User } from "apps/domain/user/user.entity";

@Entity()
export class Apply extends DefaultEntity {
  @Column("enum", {
    comment: "응모 상태",
    enum: ApplyStatus,
    default: ApplyStatus.WAITING,
  })
  applyStatus: ApplyStatus;

  @Column({ comment: "응모 번호 Uid" })
  applyUid: string;

  @Column({
    comment: "결제수단",
    enum: PaymentMethod,
    default: PaymentMethod.CARD,
  })
  paymentMethod: PaymentMethod;

  @Column({ comment: "결제 카드 코드", nullable: true })
  cardCode?: string;

  @Column({ comment: "결제 카드 이름", nullable: true })
  cardName?: string;

  @Column({ comment: "결제 카드 번호", nullable: true })
  cardNumber?: string;

  @Column({ comment: "결제 예정 금액" })
  estimatePayAmount: number;

  @Column({ comment: "실결제 완료 금액", nullable: true })
  paidAmount?: number;

  @Column({ comment: "결제 완료일", nullable: true })
  paidAt?: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.applies)
  user: User;

  @OneToMany(() => ApplyDetail, (applyDetail) => applyDetail.apply)
  applyDetails: ApplyDetail[];

  @OneToMany(() => ApplyPayment, (applyPayment) => applyPayment.apply)
  applyPayments: ApplyPayment[];
}
