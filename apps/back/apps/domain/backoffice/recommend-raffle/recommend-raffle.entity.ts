import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { RaffleType } from "apps/domain/common/enum/raffle.enum";

@Entity()
export class RecommendRaffle extends DefaultEntity {
  @Column({ comment: "추천 타겟 ID" })
  targetId: number;

  @Column("enum", {
    comment: "추천 타겟 타입",
    enum: RaffleType,
    default: RaffleType.RAFFLE,
  })
  type: RaffleType;

  @Column({ comment: "만료 여부", default: false })
  isExpired: boolean;
}
