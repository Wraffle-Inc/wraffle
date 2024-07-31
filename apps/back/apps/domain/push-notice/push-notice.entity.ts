import { Column, Entity, ManyToOne } from "typeorm";
import { DefaultEntity } from "apps/domain/common/default.entity";
import { User } from "../user/user.entity";
import { PushNoticeType } from "apps/domain/common/enum/push-notice.enum";

@Entity()
export class PushNotice extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  targetId?: number;

  @Column("enum", {
    comment: "알림 타입",
    enum: PushNoticeType,
    default: PushNoticeType.MARKETING,
  })
  type: PushNoticeType;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.pushNotices)
  user: User;
}
