import { Column, Entity, OneToMany } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { PushNotice } from "apps/domain/push-notice/push-notice.entity";
import { Card } from "apps/domain/card/card.entity";
import { Clipping } from "apps/domain/clipping/clipping.entity";

@Entity()
export class User extends DefaultEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => PushNotice, (pushNotice) => pushNotice.user)
  pushNotices: PushNotice[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];

  @OneToMany(() => Clipping, (clipping) => clipping.user)
  clippings: Clipping[];
}
