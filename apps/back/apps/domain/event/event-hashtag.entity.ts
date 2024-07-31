import { DefaultEntity } from "apps/domain/common/default.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Event } from "apps/domain/event/event.entity";
import { Hashtag } from "apps/domain/hashtag/hashtag.entity";

@Entity()
export class EventHashtag extends DefaultEntity {
  @Column({ comment: "이벤트 ID" })
  eventId: number;

  @Column({ comment: "태그 ID" })
  hashtagId: number;

  @ManyToOne(() => Event, (event) => event.eventHashtags)
  event: Event;

  @ManyToOne(() => Hashtag, (hashtag) => hashtag.eventHashtags)
  hashtag: Hashtag;
}
