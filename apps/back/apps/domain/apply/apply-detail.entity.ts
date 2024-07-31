import { Column, Entity, ManyToOne } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { RaffleType } from "apps/domain/common/enum/raffle.enum";
import { Apply } from "apps/domain/apply/apply.entity";

@Entity()
export class ApplyDetail extends DefaultEntity {
  @Column({ comment: "타겟 ID" })
  targetId: number;

  @Column("enum", { comment: "타겟 타입", enum: RaffleType })
  type: RaffleType;

  @Column({ comment: "응모 ID" })
  applyId: number;

  @ManyToOne(() => Apply, (apply) => apply.applyDetails)
  apply: Apply;
}
