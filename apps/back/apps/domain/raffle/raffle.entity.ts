import { DefaultEntity } from "apps/domain/common/default.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ApplyStatus } from "apps/domain/common/enum/apply.enum";
import { Category } from "apps/domain/category/category.entity";
import { RaffleHashtag } from "apps/domain/raffle/raffle-hashtag.entity";

@Entity()
export class Raffle extends DefaultEntity {
  @Column({ comment: "제목" })
  title: string;

  @Column({ comment: "가격" })
  price: number;

  @Column({ comment: "래플 시작일" })
  startDate: Date;

  @Column({ comment: "래플 종료일" })
  endDate: Date;

  @Column({ comment: "당첨자 발표일" })
  announceAt: Date;

  @Column({ comment: "래플 상세", nullable: true })
  description?: string;

  @Column({ comment: "래플 유의사항" })
  etc: string;

  @Column({ comment: "래플 썸네일 이미지" })
  thumbnail: string;

  @Column({ comment: "스크랩 수", default: 0 })
  clipCount: number;

  @Column({ comment: "조회 수", default: 0 })
  viewCount: number;

  @Column("enum", {
    enum: ApplyStatus,
    comment: "래플 상태",
    default: ApplyStatus.WAITING,
  })
  status: ApplyStatus;

  @Column({ comment: "래플 응모자 수", default: 0 })
  applyCount: number;

  @Column({ comment: "래플 주최자 ID" })
  createUserId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.raffles)
  category: Category;

  @OneToMany(() => RaffleHashtag, (raffleHashtag) => raffleHashtag.raffle)
  raffleHashtags: RaffleHashtag[];
}
