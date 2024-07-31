import { Column, Entity, ManyToOne } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { PaymentMethod } from "apps/domain/common/enum/payment.enum";
import { Apply } from "apps/domain/apply/apply.entity";

@Entity()
export class ApplyPayment extends DefaultEntity {
  @Column({ comment: "PG사 결제 Uid" })
  merchantUid: string;

  @Column({ comment: "아임포트사 결제 Uid" })
  impUid: string;

  @Column("enum", { enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ comment: "결제 총금액" })
  totalAmount: number;

  @Column({ comment: "실결제 금액" })
  paidAmount: number;

  @Column({ comment: "할인 금액" })
  discountAmount: number;

  @Column({ comment: "결제 완료일" })
  paidAt: Date;

  @Column({ comment: "PG사 제공자" })
  pgProvider: string;

  @Column({ comment: "PG사 고유번호" })
  pgTid: string;

  @Column({ comment: "카드사 코드" })
  cardCode: string;

  @Column({ comment: "카드 이름" })
  cardName: string;

  @Column({ comment: "카드 번호" })
  cardNumber: string;

  @Column({ comment: "카드 결제 승인번호" })
  cardApplyNumber: string;

  @Column({ comment: "결제시 영수증 발행 상품명" })
  productName: string;

  @Column()
  applyId: number;

  @ManyToOne(() => Apply, (apply) => apply.applyPayments)
  apply: Apply;
}
