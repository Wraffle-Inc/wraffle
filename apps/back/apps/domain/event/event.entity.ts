import { DefaultEntity } from "apps/domain/common/default.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { ApplyStatus } from "apps/domain/common/enum/apply.enum";
import { EventProduct } from "apps/domain/event/event-product.entity";
import { EventHashtag } from "apps/domain/event/event-hashtag.entity";

@Entity()
export class Event extends DefaultEntity {
  @Column({ comment: "제목" })
  title: string;

  @Column({ comment: "가격" })
  price: number;

  @Column({ comment: "이벤트 시작일" })
  startDate: Date;

  @Column({ comment: "이벤트 종료일" })
  endDate: Date;

  @Column({ comment: "당첨자 발표일" })
  announceAt: Date;

  @Column({ comment: "이벤트 상세", nullable: true })
  description?: string;

  @Column({ comment: "이벤트 유의사항" })
  etc: string;

  @Column({ comment: "이벤트 썸네일 이미지" })
  thumbnail: string;

  @Column({ comment: "스크랩 수", default: 0 })
  clipCount: number;

  @Column({ comment: "조회 수", default: 0 })
  viewCount: number;

  @Column("enum", {
    enum: ApplyStatus,
    comment: "이벤트 상태",
    default: ApplyStatus.WAITING,
  })
  status: ApplyStatus;

  @Column({ comment: "이벤트 응모자 수", default: 0 })
  applyCount: number;

  @Column({ comment: "이벤트 주최자 ID" })
  createUserId: number;

  @OneToMany(() => EventProduct, (eventProduct) => eventProduct.event)
  eventProducts: EventProduct[];

  @OneToMany(() => EventHashtag, (eventHashtag) => eventHashtag.event)
  eventHashtags: EventHashtag[];
}
