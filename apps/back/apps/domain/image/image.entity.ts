import { Column, Entity } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { RaffleType } from "apps/domain/common/enum/raffle.enum";

@Entity()
export class Image extends DefaultEntity {
  @Column({ comment: "이미지 URL" })
  url: string;

  @Column("enum", { enum: RaffleType })
  type: RaffleType;

  @Column({ comment: "이미지 타겟 ID" })
  targetId: number;

  @Column({ comment: "이미지 순서", nullable: true })
  index?: number;
}
