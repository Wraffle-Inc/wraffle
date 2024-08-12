import { DefaultEntity } from "apps/domain/common/default.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "apps/domain/user/user.entity";

@Entity()
export class Card extends DefaultEntity {
  @Column({ comment: "카드 이름" })
  cardName: string;

  @Column({ comment: "카드사 코드" })
  cardCode: string;

  @Column({ comment: "카드 번호" })
  cardNumber: string;

  @Column({ comment: "비밀번호" })
  cardPassword: string;

  @Column({ comment: "카드 만료일" })
  cardExpirationDate: string;

  @Column({ comment: "카드 빌링키" })
  billingKey: string;

  @Column({ comment: "주사용 카드 여부" })
  isDefault: boolean = false;

  @Column({ comment: "사용자 ID" })
  userId: number;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}
