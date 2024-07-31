import { Column, Entity, ManyToOne } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { RaffleType } from "apps/domain/common/enum/raffle.enum";
import { User } from "../user/user.entity";

@Entity()
export class Clipping extends DefaultEntity {
  @Column({ comment: "클리핑 대상 ID" })
  targetId: number;

  @Column("enum", { enum: RaffleType, comment: "클리핑 대상 타입" })
  type: RaffleType;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.clippings)
  user: User;
}
