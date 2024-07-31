import { DefaultEntity } from "apps/domain/common/default.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Hashtag } from "apps/domain/hashtag/hashtag.entity";
import { Raffle } from "apps/domain/raffle/raffle.entity";

@Entity()
export class RaffleHashtag extends DefaultEntity {
  @Column({ comment: "래플 ID" })
  raffleId: number;

  @Column({ comment: "태그 ID" })
  hashtagId: number;

  @ManyToOne(() => Raffle, (raffle) => raffle.raffleHashtags)
  raffle: Raffle;

  @ManyToOne(() => Hashtag, (hashtag) => hashtag.raffleHashtags)
  hashtag: Hashtag;
}
