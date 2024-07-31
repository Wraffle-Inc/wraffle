import { Column, Entity, OneToMany } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { ProductHashtag } from "apps/domain/product/product-hashtag.entity";
import { EventHashtag } from "apps/domain/event/event-hashtag.entity";
import { RaffleHashtag } from "apps/domain/raffle/raffle-hashtag.entity";

@Entity()
export class Hashtag extends DefaultEntity {
  @Column({ comment: "해시태그명" })
  name: string;

  @Column({ comment: "해시태그 사용 횟수", default: 0 })
  useCount: number;

  @OneToMany(() => ProductHashtag, (productHashtag) => productHashtag.hashtag)
  productHashtags: ProductHashtag[];

  @OneToMany(() => EventHashtag, (eventHashtag) => eventHashtag.hashtag)
  eventHashtags: EventHashtag[];

  @OneToMany(() => RaffleHashtag, (raffleHashtag) => raffleHashtag.hashtag)
  raffleHashtags: RaffleHashtag[];
}
